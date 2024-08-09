import { COLORED_ICONS, GRAY_ICONS } from "@/utils/icons";
import { isWatchUrl } from "@/utils/watch-url";

export default defineBackground(() => {
  function updateBrowserAction({ url }: { url?: string} = {}) {
    browser.action.setIcon({ path: url && isWatchUrl(url) ? COLORED_ICONS : GRAY_ICONS });
    browser.action.setTitle({ title: url && isWatchUrl(url) ? 'CrunchyComments: You can comment below the video :)' : 'CrunchyComments: Please navigate to a Crunchyroll video page' });
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

  updateBrowserAction()
});
