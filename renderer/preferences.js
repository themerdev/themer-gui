import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
const { app } = remote;
import { defaultPreferences } from './reducers/preferences';

const PREF_PATH = path.join(app.getPath('userData'), 'preferences.json');

export const readPreferences = () => {
  try {
    return {
      ...defaultPreferences,
      ...JSON.parse(fs.readFileSync(PREF_PATH, { encoding: 'utf8' })),
    };
  }
  catch (e) {
    return defaultPreferences;
  }
};

const writePrefs = prefs => fs.writeFileSync(PREF_PATH, JSON.stringify(prefs));

export const getPreference = key => readPreferences()[key];

export const connectPreferences = store => {
  store.subscribe(() => {
    writePrefs(store.getState().preferences);
  });
};
