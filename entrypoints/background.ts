import { COLORED_ICONS, DISABLED_ICONS, GRAY_ICONS } from "@/utils/icons";
import { isWatchUrl } from "@/utils/watch-url";
import { localStorage } from "@/utils/typed-storage";
import { Tabs } from "webextension-polyfill";

export default defineBackground(() => {
  const browserAction = browser.action ?? browser.browserAction;

  async function sendAction(tabIdOrTab: number | Tabs.Tab, action: 'ccomm::onEnabled' | 'ccomm::onDisabled') {
    const tab = typeof tabIdOrTab === 'number' ? await browser.tabs.get(tabIdOrTab) : tabIdOrTab;

    if (!tab.id || !tab.url || !isWatchUrl(tab.url)) {
      return
    }
    
    return browser.tabs.sendMessage(tab.id, { tab, action });
  }

  async function updateBrowserAction(url?: string) {
    const { isEnabled } = await localStorage.get({ isEnabled: true })

    if (isEnabled) {
      browserAction.setIcon({ path: url && isWatchUrl(url) ? COLORED_ICONS : GRAY_ICONS });
      browserAction.setTitle({ title: url && isWatchUrl(url) ? 'CrunchyComments: You can comment below the video :)' : 'CrunchyComments: Please navigate to a Crunchyroll video page' });
    } else {
      browserAction.setIcon({ path: DISABLED_ICONS });
      browserAction.setTitle({ title: 'CrunchyComments (Click to Enable)' });
    }
  }

  browserAction.onClicked.addListener(async (tab) => {
    const { isEnabled: wasEnabled } = await localStorage.get({ isEnabled: true }) as { isEnabled: boolean };
    const isEnabled = !wasEnabled;

    localStorage.set({ isEnabled });
  });

  browser.storage.onChanged.addListener(async ({ isEnabled }, areaName) => {
    if (areaName !== 'local' || !isEnabled) {
      return
    }

    ;(await browser.tabs.query({ active: true, currentWindow: true })).forEach(tab => {
      updateBrowserAction(tab.url);
      sendAction(tab, isEnabled.newValue ? 'ccomm::onEnabled' : 'ccomm::onDisabled');
    });
  });

  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    const tab = await browser.tabs.get(tabId);
    const { isEnabled } = await localStorage.get({ isEnabled: true })
    
    updateBrowserAction(tab.url);
    sendAction(tab, isEnabled ? 'ccomm::onEnabled' : 'ccomm::onDisabled');
  });

  browser.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
    if (!tab.active || changeInfo.status !== 'complete') {
      return
    }
    
    const { isEnabled } = await localStorage.get({ isEnabled: true })

    updateBrowserAction(tab.url);
    sendAction(tab, isEnabled ? 'ccomm::onEnabled' : 'ccomm::onDisabled');
  });

  updateBrowserAction()
});
