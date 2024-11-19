import {
  Component,
  HostBinding,
  signal,
  ViewEncapsulation,
  OnDestroy,
  afterRender,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { SharedUtil } from '../../shared/utils/shared.util';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { SettingsActions, settingsSelectors } from '../../shared/settings';
import { MatListItem, MatNavList } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { NavItem } from '../../shared/settings/model/settings.model';
import { AppTheme } from '../../shared/types/shared.types';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    MatNavList,
    RouterLink,
    TranslateModule,
    MatListItem,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainContainerComponent implements OnDestroy {
  #store = inject(Store);
  @HostBinding('class')
  currentTheme: AppTheme = 'light-theme';
  isDarkMode = false;
  navItems = toSignal(
    this.#store.select<NavItem[]>(settingsSelectors.getNavItems)
  );
  headerKey = toSignal(
    this.#store.select<string>(settingsSelectors.getTabHeaderKey)
  );

  private unsubscribe$ = new Subject<void>();
  pageWidth = signal<number>(0);
  isMediumWidth = computed(() =>
    SharedUtil.isMediumPageWidth(this.pageWidth())
  );
  constructor() {
    this.#store
      .select(settingsSelectors.getAppTheme)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(appTheme => {
        this.currentTheme = appTheme;
      });
    afterRender(() => {
      this.calculateDeviceWidth(window.innerWidth);
      fromEvent(window, 'resize')
        .pipe(debounceTime(30), takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.calculateDeviceWidth(window.innerWidth);
        });
    });
  }

  calculateDeviceWidth(pageSize: number) {
    this.pageWidth.set(pageSize);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeTheme(theme: AppTheme) {
    this.#store.dispatch(SettingsActions.setTheme(theme));
  }
}
