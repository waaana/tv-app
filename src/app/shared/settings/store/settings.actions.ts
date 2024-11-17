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
