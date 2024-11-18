import { createAction } from '@ngrx/store';
import { NavItem } from '../model/settings.model';
import { AppTheme } from '../../types';

export const setSettings = createAction(
  '[Settings] Set Settings',
  (navItems: NavItem[]) => ({ navItems })
);

export const setTheme = createAction(
  '[Settings] Set Theme',
  (appTheme: AppTheme) => ({ appTheme })
);

export const setTabHeader = createAction(
  '[Settings] Set App Header',
  (tabHeaderKey: string) => ({ tabHeaderKey })
);

export const fetchMoreItems = createAction('[Settings] Fetch More Items');
