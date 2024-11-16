import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/header/header.component';
import { AppTheme } from '../../shared/types';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainContainerComponent {
  @HostBinding('class')
  currentTheme: AppTheme = 'light-theme';
  isDarkMode = false;

  changeTheme(theme: AppTheme) {
    this.currentTheme = theme;
  }
}
