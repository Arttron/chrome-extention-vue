import { appState } from './app/store';
import { saveValue } from './app/utyls/storaje';
import { refreshAllGoogleTabs } from './app/utyls';
import gAnalytic from './app/utyls/googleAnalitica';

const HOW_TO_USE_URL = 'https://custom-logo.loogl.net/how-to-use';

gAnalytic.insertGA();

chrome.runtime.onInstalled.addListener(function ({ reason }) {
  if (reason === 'install') {
    gAnalytic.fireEvent('Action with extension', 'extension install');
  }

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: 'www.google.' },
      }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    ]);
  });

  for (let key in appState) {
    if (appState.hasOwnProperty(key)) {
      saveValue({ [key]: appState[key] });
    }
  }

  refreshAllGoogleTabs();

  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tab) => {
    chrome.tabs.update(tab.id, { url: HOW_TO_USE_URL })
  });
});
