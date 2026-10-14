import { formatCurrency } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import {
  CurrencyConverterService,
  CurrencyConvertSide,
  CurrencyRatesService,
  CurrencyShape,
} from '@shared/Currency';
import { round } from '@utils/round';



export interface SelectCurrencyDialogData {
  currencies: CurrencyShape[];
  currency: CurrencyShape;
  principal: number;
}



@Component({
  selector: 'select-currency-modal',
  template: `
    <h2 mat-dialog-title>
      {{ 'calculator.inputs.currency' | translate }}
    </h2>

    <mat-dialog-content>
      <mat-form-field class="w-full" appearance="outline" subscriptSizing="dynamic">
        <mat-label>{{ 'calculator.currency_dialog.search' | translate }}</mat-label>
        <input
          matInput
          cdkFocusInitial
          type="text"
          autocomplete="off"
          [value]="query()"
          (input)="onQuery($event)"
        />
      </mat-form-field>

      <div class="flex flex-col gap-1 mt-3" role="listbox" [attr.aria-label]="'calculator.inputs.currency' | translate">
        @for (currency of visible(); track currency.code) {
          <button
            type="button"
            role="option"
            class="grid grid-cols-[24px_minmax(0,1fr)] items-center gap-3 w-full min-h-16 px-3 py-2 rounded-lg text-start"
            [class.mat-bg-secondary-container]="currency.code === selected().code"
            [class.mat-text-on-secondary-container]="currency.code === selected().code"
            [attr.aria-selected]="currency.code === selected().code"
            (click)="select(currency)"
          >
            <mat-icon aria-hidden="true">{{ currency.code === selected().code ? 'check' : '' }}</mat-icon>

            <span class="min-w-0">
              <span class="mat-font-body-md block">
                {{ currency.symbol }} {{ currency.code }} · {{ 'units.currency.' + currency.code | translate }}
              </span>
              <span
                class="mat-font-label-md block"
                [class.mat-text-on-surface-variant]="currency.code !== selected().code"
              >
                {{ detail(currency) }}
              </span>
            </span>
          </button>
        } @empty {
          <p class="mat-font-body-md mat-text-on-surface-variant m-0 py-4 text-center">
            {{ 'calculator.currency_dialog.empty' | translate }}
          </p>
        }
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button matButton [mat-dialog-close]>
        {{ 'dashboard.deposit_dialog.cancel' | translate }}
      </button>
      <button
        matButton="filled"
        [mat-dialog-close]="selected()"
        [disabled]="selected().code === current.code"
      >
        {{ 'calculator.currency_dialog.convert' | translate }}
      </button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
  ],
})
export class SelectCurrencyModal {
  public readonly query = signal('');
  public readonly selected = signal<CurrencyShape>(inject<SelectCurrencyDialogData>(MAT_DIALOG_DATA).currency);

  public readonly currencies: CurrencyShape[];
  public readonly current: CurrencyShape;
  public readonly principal: number;

  public readonly visible = computed(() => {
    const query = this.query().trim().toLowerCase();
    const currencies = [...this.currencies].sort((a, b) => {
      return this._name(a).localeCompare(this._name(b), this._translate.currentLang()!);
    });

    if (!query) {
      return currencies;
    }

    return currencies.filter((currency) => {
      return currency.code.toLowerCase().includes(query)
        || currency.symbol.toLowerCase().includes(query)
        || this._name(currency).toLowerCase().includes(query);
    });
  });



  public constructor(
    private _converter: CurrencyConverterService,
    private _rates: CurrencyRatesService,
    private _translate: TranslateService,
  ) {
    const data = inject<SelectCurrencyDialogData>(MAT_DIALOG_DATA);

    this.currencies = data.currencies;
    this.principal = data.principal;
    this.current = data.currencies.find(
      currency => currency.code === data.currency.code
    ) ?? data.currency;
    this.selected.set(this.current);
  }



  public onQuery(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }

  public select(currency: CurrencyShape) {
    this.selected.set(currency);
  }

  public detail(currency: CurrencyShape) {
    if (currency.code === this.current.code) {
      return this._translate.instant('calculator.currency_dialog.current');
    }

    if (!this._rates.getRate(currency.code) || !this._rates.getRate(this.current.code)) {
      return '';
    }

    const rate = new Intl.NumberFormat(this._translate.currentLang()!, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(round(this._rates.crossRate(currency.code, this.current.code), 4));

    if (this.principal <= 0) {
      return this._translate.instant('calculator.currency_dialog.rate', {
        symbol: currency.symbol,
        rate,
        currentSymbol: this.current.symbol,
      });
    }

    const amount = formatCurrency(
      this._converter.convert(
        this.principal,
        this.current.code,
        currency.code,
        CurrencyConvertSide.Equal,
      ),
      this._translate.currentLang()!,
      currency.symbol,
      currency.code,
      '0.2',
    );

    return this._translate.instant('calculator.currency_dialog.preview', {
      symbol: currency.symbol,
      rate,
      currentSymbol: this.current.symbol,
      amount,
    });
  }



  private _name(currency: CurrencyShape) {
    return this._translate.instant('units.currency.' + currency.code) as string;
  }
}
