import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {
  Component,
  computed,
  effect,
  OnInit,
  Renderer2,
  Signal,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { CurrencyService, CurrencyShape } from '@shared/currency.service';
import { HistoryService } from '@shared/history';
import { ShortcutsService } from '@shared/shortcuts.service';
import { Theme, ThemeService } from '@shared/theme.service';

import { LanguageShape, SUPPORTED_LANGUAGES } from '../config/supported-languages';

@Component({
  selector: 'app-root',
  providers: [MatIconRegistry, BreakpointObserver, ThemeService, CurrencyService],
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
    class: 'block h-full w-full overflow-scroll',
  },
})
export class App implements OnInit {
  private _breakpoint2SizeMap: Record<string, string>;

  public languages: LanguageShape[];
  public currencies: CurrencyShape[];

  public readonly currencyIcon: Signal<CurrencyShape>;

  public themeIcon = computed(() => {
    return this._theme.theme() === Theme.Light ? 'dark_mode' : 'light_mode';
  });

  public readonly size = signal<'' | 'sm' | 'md' | 'lg'>('');

  public constructor(
    private _translate: TranslateService,
    private _history: HistoryService,
    private _shortcuts: ShortcutsService,
    private _breakpoint: BreakpointObserver,
    private _theme: ThemeService,
    private _renderer: Renderer2,
    private _currency: CurrencyService,
  ) {
    this.languages = SUPPORTED_LANGUAGES;

    this._breakpoint2SizeMap = {
      [Breakpoints.Small]: 'sm',
      [Breakpoints.Medium]: 'md',
      [Breakpoints.Large]: 'lg',
    };

    this.currencies = this._currency.getSupportedCurrencies();

    this.currencyIcon = this._currency.currency;


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
  }

  public ngOnInit(): void {
    const breakpoints = [Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large];

    this._breakpoint
      .observe(breakpoints)
      .pipe()
      .subscribe((state) => {
        for (const breakpoint of breakpoints) {
          if (state.breakpoints[breakpoint]) {
            this.size.set(this._breakpoint2SizeMap[breakpoint] as '' | 'sm' | 'md' | 'lg');
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

  public changeCurrency(currency: CurrencyShape) {
    this._currency.changeCurrency(currency);
  }

  public toggleTheme() {
    this._theme.toggleTheme();
  }

  public selectLanguage(language: LanguageShape) {
    this._translate.use(language.locale);
  }

  private _getContentWidth(state: BreakpointState) {
    if (state.breakpoints[Breakpoints.Small]) {
      return 600;
    } else if (state.breakpoints[Breakpoints.Medium]) {
      return 800;
    } else if (state.breakpoints[Breakpoints.Large]) {
      return 1200;
    }

    return 900;
  }
}
