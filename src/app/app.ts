import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { LanguageShape, SUPPORTED_LANGUAGES } from '../config/supported-languages';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-root',
  providers: [ MatIconRegistry ],
  imports: [
    RouterOutlet,

    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatNavList,
    MatButtonModule,
    MatIconModule,

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
