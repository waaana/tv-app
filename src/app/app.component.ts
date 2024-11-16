import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tv-app';
  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'de']);
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
}
