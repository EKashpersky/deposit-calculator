import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  Renderer2,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { environment } from '@environment/development';

import { SUPPORTED_LANGUAGES } from '@config/supported-languages';
import { PreferencesDialog } from '@features/preferences';
import {
  CurrencyBankService,
  CurrencyService,
} from '@shared/Currency';
import { DepositBridgeService, DepositsManagerService } from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { PaneManagerService } from '@shared/pane-manager.service';
import { PreferencesService } from '@shared/preferences';
import { ShortcutsService } from '@shared/shortcuts.service';
import { ThemeEnum, ThemeService } from '@shared/theme.service';



@Component({
  selector: 'app-root',
  providers: [
    MatIconRegistry,
    BreakpointObserver,
  ],
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,

    TranslatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'flex flex-col items-center h-full grow shrink overflow-auto',
  },
})
export class App {
  private _injector: Injector;

  public readonly githubUrl: string;
  public readonly linkedInUrl: string;

  public readonly appVersion = signal('');

  public readonly appLoaded = signal(false);



  public constructor(
    private _currency: CurrencyService,
    private _currencyBank: CurrencyBankService,
    private _depositBridge: DepositBridgeService,
    private _depositsManager: DepositsManagerService,
    private _dialog: MatDialog,
    private _history: HistoryService,
    private _preferences: PreferencesService,
    private _renderer: Renderer2,
    private _shortcuts: ShortcutsService,
    private _theme: ThemeService,
    private _title: Title,
    private _translate: TranslateService,
    public pane: PaneManagerService,
  ) {
    this._injector = inject(Injector);

    this.githubUrl    = 'https://github.com/ekashpersky/deposit-calculator';
    this.linkedInUrl  = 'https://linkedin.com/in/ekashpersky';

    const fontsLoaded = Promise.allSettled([
      document.fonts.ready,
      document.fonts.load('18px "Material Symbols Outlined"'),
    ]);

    const currencyBankLoaded = new Promise<void>(resolve => {
      effect(() => {
        if (this._currencyBank.rates.hasValue()) {
          resolve();
        }
      });
    });

    /**
     * Determines if the app is loaded. Removes fullscreen loader and unblocks
     * routing
    **/
    Promise.all([
      fontsLoaded,
      currencyBankLoaded,
    ]).then(() => {
      const loader = document.querySelector('body .boot-loader')!;
      this._renderer.addClass(loader, 'leave');

      this.appLoaded.set(true);

      loader.addEventListener('transitionend', () => {
        this._renderer.removeChild(document.body, loader);
      }, { once: true });
    });

    this._currency.changePreferredCurrency(
      this._currency.getPreferredOrFallbackCurrency()
    );

    this._depositBridge.deposit.subscribe((deposit) => {
      if (deposit) {
        const updateDepositAction = this._depositsManager.updateDeposit(deposit);

        this._history.addAction(updateDepositAction);
      }
    });

    effect(() => {
      this._title.setTitle(this._translate.instant('app_title'));
    });

    /// Keep track of user preferences on user storage level
    effect(() => {
      this._preferences.patch({
        theme: this._theme.userTheme(),
        language:  this._translate.currentLang(),
        currency: this._currency.preferredCurrency()!.code
      });

      this._preferences.save();
    });

    effect(() => {
      this._shortcuts.undo();
      this._history.undoLast();
    });

    effect(() => {
      this._shortcuts.redo();
      this._history.redoLast();
    });

    effect(() => {
      if (!document.startViewTransition) {
        this._applyTheme(this._theme.appTheme());
        return;
      }

      document.startViewTransition(this._applyTheme.bind(this, this._theme.appTheme()));
    });

    /// Set up application version once
    effect(() => {
      this.appVersion.set(environment.version())
    });
  }

  public openPreferences() {
    const dialogRef = this._dialog.open(PreferencesDialog, {
      data: {
        i18nTitle: 'preferences_dialog.title',
        i18nAction: 'preferences_dialog.create',
        currencies: this._currencyBank.getMappedRates(),
        preferredCurrency: this._currency.getPreferredOrFallbackCurrency(),
        languages: SUPPORTED_LANGUAGES,
        language: this._translate.currentLang(),
        theme: this._theme
      },
    });

    /// Update ui on preferred currency change
    effect(() => {
      this._currency.changePreferredCurrency(
        dialogRef.componentInstance.preferredCurrency()
      );
    }, { injector: this._injector });

    /// Update ui on language change
    effect(() => {
      this._translate.use(dialogRef.componentInstance.language().locale);
    }, { injector: this._injector });
  }

  public openLinkedIn() {
    window.open(this.linkedInUrl, '_blank', 'noopener,noreferrer');
  }

  public openGithub() {
    window.open(this.githubUrl, '_blank', 'noopener,noreferrer');
  }

  private _applyTheme(theme: ThemeEnum) {
    this._renderer.removeClass(document.body, 'dark');
    this._renderer.removeClass(document.body, 'light');

    this._renderer.addClass(document.body, theme);
  }
}
