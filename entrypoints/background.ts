import { COLORED_ICONS, GREY_ICONS } from "@/utils/icons";
import { isWatchUrl } from "@/utils/watch-url";
import type { Tabs } from "webextension-polyfill"

export default defineBackground(() => {
  function updateBrowserAction(tab: Tabs.Tab) {
    browser.action.setIcon({ path: tab.url && isWatchUrl(tab.url) ? COLORED_ICONS : GREY_ICONS });
    browser.action.setTitle({ title: tab.url && isWatchUrl(tab.url) ? 'CrunchyComments: You can comment below the video :)' : 'CrunchyComments: Please navigate to a Crunchyroll video page' });
  }

  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    const tab = await browser.tabs.get(tabId);
    updateBrowserAction(tab);
  });

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.active || changeInfo.status !== 'complete') {
      return
    }

    updateBrowserAction(tab);
    browser.tabs.sendMessage(tabId, { action: 'onTabUpdated', tab });
  });
});
