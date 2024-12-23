import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsFeatureKey, SettingsState } from '..';
import { NavItem } from '../model/settings.model';
import { AppTheme } from '../../types/shared.types';

export const selectSettingsFeature =
  createFeatureSelector<SettingsState>(settingsFeatureKey);

const getNavItems = createSelector(
  selectSettingsFeature,
  (state: SettingsState): NavItem[] => state.navItems
);

const getAppTheme = createSelector(
  selectSettingsFeature,
  (state: SettingsState): AppTheme => state.appTheme
);

const getTabHeaderKey = createSelector(
  selectSettingsFeature,
  (state: SettingsState): string => state.tabHeaderKey
);

export const settingsSelectors = {
  getNavItems,
  getAppTheme,
  getTabHeaderKey,
};
