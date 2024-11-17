import { createReducer, on } from '@ngrx/store';
import { NavItem } from '../model/settings.model';
import { SettingsActions } from '..';
import { AppTheme } from '../../types';

export const settingsFeatureKey = 'Settings';

export interface SettingsState {
  navItems: NavItem[];
  appTheme: AppTheme;
}

const initialState: SettingsState = {
  navItems: [],
  appTheme: 'light-theme',
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.setSettings, (state, { navItems }) => ({
    ...state,
    navItems: [...navItems],
  })),
  on(SettingsActions.setTheme, (state, { appTheme }) => ({
    ...state,
    appTheme,
  }))
);
