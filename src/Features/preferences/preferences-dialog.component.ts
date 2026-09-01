import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { LanguageShape } from '@config/supported-languages';
import { CurrencyService, CurrencyShape } from '@shared/Currency';
import { ThemeEnum, ThemeService } from '@shared/theme.service';



@Component({
  selector: 'preferences-dialog',
  template: `
    <h2 mat-dialog-title>
      {{ "preferences_dialog.title" | translate }}
    </h2>

    <mat-dialog-content>
      <div
        id="layout"
        class="grid grid-cols-[24px_auto_minmax(180px,1fr)] items-center gap-x-[8px] gap-y-[12px] select-none"
      >
        <mat-icon
          [matTooltip]="'preferences_dialog.preferred_currency_tooltip' | translate"
          class="mat-text-on-surface-variant cursor-pointer justify-self-center"
        >info</mat-icon>

        <span class="mat-font-label-md justify-self-end">
          {{ "preferences_dialog.preferred_currency" | translate }}
        </span>

        <mat-form-field appearance="outline" subscriptSizing="dynamic" class="w-full">
          <mat-select [value]="preferredCurrency()">
            @for (currency of currencies; track currency) {
              <mat-option [value]="currency" (click)="selectCurrency(currency)">
                {{ currency.symbol }} {{ 'units.currency.' + currency.code | translate }}
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <span></span>

        <span class="mat-font-label-md justify-self-end">
          {{ "preferences_dialog.language" | translate }}
        </span>

        <mat-form-field appearance="outline" subscriptSizing="dynamic" class="w-full">
          <mat-select [value]="language()">
            @for (language of languages; track language) {
              <mat-option [value]="language" (click)="selectLanguage(language)">
                {{ language.name }}
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        <span></span>

        <span class="mat-font-label-md justify-self-end">
          {{ "preferences_dialog.theme" | translate }}
        </span>

        <div class="justify-self-start">
          <button matIconButton (click)="cycleTheme()">
            <mat-icon>{{ themeIcon() }}</mat-icon>
          </button>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button matButton [mat-dialog-close]>
        {{ 'preferences_dialog.close' | translate }}
      </button>
    </mat-dialog-actions>
  `,

  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    TranslatePipe,
  ],
})
export class PreferencesDialog {
  public readonly currencies: CurrencyShape[];
  public readonly preferredCurrency: WritableSignal<CurrencyShape>;

  public readonly languages: LanguageShape[];
  public readonly language: WritableSignal<LanguageShape>;

  public readonly themeIcon: Signal<'dark_mode' | 'light_mode'>;



  public constructor(
    private _currency: CurrencyService,
    private _language: TranslateService,
    private _theme: ThemeService,
  ) {
    const data = inject(MAT_DIALOG_DATA);

    const currencyCode      = this._currency.getPreferredOrFallbackCurrency().code;
    this.currencies         = data.currencies as CurrencyShape[];
    this.preferredCurrency  = signal(this.currencies.find(
      cx => cx.code === currencyCode
    )!);

    const language  = this._language.getCurrentLang();
    this.languages  = data.languages as LanguageShape[];
    this.language   = signal(this.languages.find(
      lx => lx.locale === language
    )!);
    this.themeIcon  = computed(() => {
      return this._theme.theme() === ThemeEnum.Light ? 'light_mode' : 'dark_mode';
    });
  }

  public selectCurrency(currency: CurrencyShape) {
    this.preferredCurrency.set(currency);
  }

  public selectLanguage(language: LanguageShape) {
    this.language.set(language);
  }

  public cycleTheme() {
    this._theme.cycleTheme();
  }
}