export default defineBackground(() => {
  browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
    browser.tabs.sendMessage(details.tabId, { action: 'onHistoryStateUpdated', details });
  });
});
