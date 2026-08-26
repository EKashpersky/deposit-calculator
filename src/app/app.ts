import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Renderer2,
  signal,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { environment } from '@environment/development';

import { CurrencyApiService } from '@api/currency-api.service';
import {
  LanguageShape,
  SUPPORTED_LANGUAGES
} from '@config/supported-languages';
import {
  CurrencyRatesService,
  CurrencyService,
  CurrencyShape
} from '@shared/Currency';
import { DepositBridgeService, DepositsManagerService } from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { PreferencesService } from '@shared/preferences';
import { ShortcutsService } from '@shared/shortcuts.service';
import { ThemeEnum, ThemeService } from '@shared/theme.service';



@Component({
  selector: 'app-root',
  providers: [
    MatIconRegistry,
    BreakpointObserver,

    CurrencyApiService,
  ],
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
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'block h-full w-full overflow-auto',
  },
})
export class App implements OnInit {
  private _breakpoint2SizeMap: Record<string, string>;

  public languages: LanguageShape[];
  public currencies: CurrencyShape[];

  public readonly preferredCurrency: Signal<CurrencyShape>;

  public themeIcon = computed(() => {
    return this._theme.theme() === ThemeEnum.Light ? 'dark_mode' : 'light_mode';
  });

  public readonly size = signal<'' | 'sm' | 'md' | 'lg' | 'xlg'>('');

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
    private _preferences: PreferencesService,
  ) {
    Promise.allSettled([
      document.fonts.ready,
      document.fonts.load('18px "Material Icons"'),
    ]).then(() => {
      const loader = document.querySelector('body .boot-loader');

      this._renderer.addClass(loader, 'leave');

      setTimeout(() => {
        this._renderer.removeChild(document.body, loader);
      }, 350);
    });

    this.languages = SUPPORTED_LANGUAGES;

    this._breakpoint2SizeMap = {
      [Breakpoints.Small]: 'sm',
      [Breakpoints.Medium]: 'md',
      [Breakpoints.Large]: 'lg',
      [Breakpoints.XLarge]: 'xlg'
    };

    this.currencies = [];

    this.preferredCurrency = this._currency.preferredCurrency as Signal<CurrencyShape>;

    this._currency.changePreferredCurrency(
      this._currency.getPreferredOrFallbackCurrency()
    );

    inject(CurrencyApiService).getCurrencyRates().then((rates) => {
      this._currencyRates.setRates(rates);
      this.currencies = this._currency.getCurrenciesWithRates();
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

  public changePreferredCurrency(currency: CurrencyShape) {
    this._currency.changePreferredCurrency(currency);
  }

  public toggleTheme() {
    this._theme.cycleTheme();
  }

  public selectLanguage(language: LanguageShape) {
    this._translate.use(language.locale);
  }
}
