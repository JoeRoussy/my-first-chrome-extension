chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id, {
        type: 'TOGGLE_DOGS_MSG',
        body: 'Toggle the dogs pls'
    });
});
