import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { environment } from '@environment/development';

import { MatDialog } from '@angular/material/dialog';
import { CurrencyApiService } from '@api/currency-api.service';
import { SUPPORTED_LANGUAGES } from '@config/supported-languages';
import { PreferencesDialog } from '@features/preferences';
import {
  CurrencyRatesService,
  CurrencyService,
} from '@shared/Currency';
import { DepositBridgeService, DepositsManagerService } from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { PreferencesService } from '@shared/preferences';
import { ShortcutsService } from '@shared/shortcuts.service';
import { ThemeService } from '@shared/theme.service';



@Component({
  selector: 'app-root',
  providers: [
    MatIconRegistry,
    BreakpointObserver,

    CurrencyApiService,
  ],
  imports: [
    RouterOutlet,
    RouterLink,

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
export class App implements OnInit {
  private _breakpoint2SizeMap: Record<string, string>;
  private _injector: Injector;

  public readonly githubUrl: string;
  public readonly linkedInUrl: string;

  public readonly size = signal<'' | 'sm' | 'md' | 'lg' | 'xlg'>('');
  public readonly sizePx = computed(() => {
    const size = this.size();

    let sizeInPx = 0;
    switch (size) {
      case 'sm':  sizeInPx = 600; break;
      case 'md':  sizeInPx = 800; break;
      case 'lg':
      case 'xlg': sizeInPx = 1200; break;
    }

    return sizeInPx;
  });

  public readonly appVersion = signal('');

  public readonly fontsLoaded = signal(false);



  public constructor(
    private _translate: TranslateService,
    private _history: HistoryService,
    private _shortcuts: ShortcutsService,
    private _breakpoint: BreakpointObserver,
    private _theme: ThemeService,
    private _renderer: Renderer2,
    private _currency: CurrencyService,
    private _currencyRates: CurrencyRatesService,
    private _depositsManager: DepositsManagerService,
    private _depositBridge: DepositBridgeService,
    private _dialog: MatDialog,
    private _preferences: PreferencesService,
  ) {
    this._injector = inject(Injector);

    this.githubUrl    = 'https://github.com/ekashpersky/deposit-calculator';
    this.linkedInUrl  = 'https://linkedin.com/in/ekashpersky';

    Promise.allSettled([
      document.fonts.ready,
      document.fonts.load('18px "Material Symbols Outlined"'),
    ]).then(() => {
      const loader = document.querySelector('body .boot-loader');

      this._renderer.addClass(loader, 'leave');

      setTimeout(() => {
        this._renderer.removeChild(document.body, loader);
      }, 350);
    });

    this._breakpoint2SizeMap = {
      [Breakpoints.Small]: 'sm',
      [Breakpoints.Medium]: 'md',
      [Breakpoints.Large]: 'lg',
      [Breakpoints.XLarge]: 'xlg'
    };

    this._currency.changePreferredCurrency(
      this._currency.getPreferredOrFallbackCurrency()
    );

    inject(CurrencyApiService).getCurrencyRates().then((rates) => {
      this._currencyRates.setRates(rates);
    });

    this._depositBridge.deposit.subscribe((deposit) => {
      if (deposit) {
        const updateDepositAction = this._depositsManager.updateDeposit(deposit);

        this._history.addAction(updateDepositAction);
      }
    });

    /// Keep track of user preferences on user storage level
    effect(() => {
      this._preferences.patch({
        theme: this._theme.theme(),
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
      this._renderer.removeClass(document.body, this._theme.lastTheme());
      this._renderer.addClass(document.body, this._theme.theme());
    });

    /// Set up application version once
    effect(() => {
      this.appVersion.set(environment.version())
    });
  }

  public ngOnInit(): void {
    const breakpoints = [
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ];

    this._breakpoint
      .observe(breakpoints)
      .pipe()
      .subscribe((state) => {
        for (const breakpoint of breakpoints) {
          if (state.breakpoints[breakpoint]) {
            this.size.set(
              this._breakpoint2SizeMap[breakpoint] as '' | 'sm' | 'md' | 'lg' | 'xlg'
            );
            break;
          }
        }
      });

    findBreakpoint: for (const breakpoint of breakpoints) {
      if (this._breakpoint.isMatched(breakpoint)) {
        this.size.set(this._breakpoint2SizeMap[breakpoint] as '' | 'sm' | 'md' | 'lg');
        break findBreakpoint;
      }
    }
  }

  public openPreferences() {
    const dialogRef = this._dialog.open(PreferencesDialog, {
      data: {
        i18nTitle: 'preferences_dialog.title',
        i18nAction: 'preferences_dialog.create',
        currencies: this._currency.getCurrenciesWithRates(),
        preferredCurrency: this._currency.getPreferredOrFallbackCurrency(),
        languages: SUPPORTED_LANGUAGES,
        language: this._translate.currentLang(),
        theme: this._theme
      },
    });

    effect(() => {
      this._currency.changePreferredCurrency(
        dialogRef.componentInstance.preferredCurrency()
      );
    }, { injector: this._injector });

    effect(() => {
      this._translate.use(dialogRef.componentInstance.language().locale);
    }, { injector: this._injector });
  }

  public openLinkedIn() {
    const linkedInUrl = 'https://linkedin.com/in/ekashpersky';

    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  }

  public openGithub() {
    const githubUrl = 'https://github.com/ekashpersky/deposit-calculator';

    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  }
}
