import {
  Component,
  output,
  signal,
  OnInit,
  input,
  computed,
} from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AppTheme, LangDrowpdownOptions, LangOption } from '../../shared/types';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SharedUtil } from '../../shared/utils/shared.util';
import { NavItem } from '../../shared/settings/model/settings.model';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    MatMenuModule,
    MatToolbarRow,
    MatSlideToggle,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuItem,
    MatDivider,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  changeTheme = output<AppTheme>();
  pageWidth = input<number>(0);
  navItems = input<NavItem[] | undefined>([]);
  isSmallWidth = computed(() => SharedUtil.isSmallPageWidth(this.pageWidth()));
  isMediumWidth = computed(() =>
    SharedUtil.isMediumPageWidth(this.pageWidth())
  );

  selectedLang = signal<LangOption>('en');
  langOptions = signal<LangDrowpdownOptions[]>([
    { language: 'en' },
    { language: 'de' },
  ]);

  isDarkMode = false;
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.selectedLang.set(this.translateService.currentLang as LangOption);
  }

  onThemeChanged() {
    this.isDarkMode = !this.isDarkMode;
    console.log(this.isDarkMode);
    if (this.isDarkMode) {
      this.changeTheme.emit('dark-theme');
    } else {
      this.changeTheme.emit('light-theme');
    }
  }

  selectLanguage(lang: LangOption) {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    this.selectedLang.set(lang);
  }
}
