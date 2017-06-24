import { defaultPreferences } from './reducers/preferences';

const PREF_KEY = 'preferences';

export const readPreferences = () => {
  try {
    return {
      ...defaultPreferences,
      ...JSON.parse(window.localStorage.getItem(PREF_KEY)),
    };
  }
  catch (e) {
    return defaultPreferences;
  }
};

const writePrefs = prefs => window.localStorage.setItem(PREF_KEY, JSON.stringify(prefs));

export const getPreference = key => readPreferences()[key];

export const connectPreferences = store => {
  store.subscribe(() => {
    writePrefs(store.getState().preferences);
  });
};
