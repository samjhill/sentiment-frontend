const defaultSettings = {
  showTickers: {
    label: 'Tickers',
    value: false,
  },
  showRedditSentiment: {
    label: 'Reddit Sentiment',
    value: true,
  },
  showDeltas: {
    label: 'Sentiment At-A-Glance',
    value: true,
  },
  showNewsFeed: {
    label: 'News Feed',
    value: true,
  },
  showRedditActiveUsers: {
    label: 'Reddit Active Users',
    value: true,
  },
  showSearchTrends: {
    label: 'Search Trends',
    value: true,
  },
  showRedditComments: {
    label: 'Reddit Comments',
    value: false,
  },
};

export const loadSettings = () => {
  // load settings from storage
  const storedSettings = JSON.parse(localStorage.getItem('settings'));

  if (storedSettings) {
    Object.keys(defaultSettings).map(settingName => {
      if (storedSettings[settingName]) {
        defaultSettings[settingName].value = storedSettings[settingName].value;
      }
    });
  }
  return defaultSettings;
};

export const saveSetting = (key, value) => {
  const settings = loadSettings();
  settings[key].value = value;
  localStorage.setItem('settings', JSON.stringify(settings));
};
