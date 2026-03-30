import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { LanguageShape, SUPPORTED_LANGUAGES } from '../config/supported-languages';



@Component({
  selector: 'app-root',
  providers: [ MatIconRegistry ],
  imports: [
    RouterOutlet,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,

    TranslatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'block h-full w-full',
  }
})
export class App {
  public menuOpened: boolean;

  public languages: LanguageShape[];

  public constructor(private _translate: TranslateService) {
    this.menuOpened = false;

    this.languages = SUPPORTED_LANGUAGES;
  }

  public toggleExpand() {
    this.menuOpened = !this.menuOpened;
  }

  public minimizeMenu() {
    this.menuOpened = false;
  }

  public selectLanguage(language: LanguageShape) {
    this._translate.use(language.locale);
  }

}
