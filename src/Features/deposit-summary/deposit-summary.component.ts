import { PercentPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  WritableSignal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { CurrencyComponent } from '@components/currency';
import { DepositModel } from '@features/calculator/model';
import {
  CurrencyConverterService,
  CurrencyConvertSide,
  CurrencyRatesService,
  CurrencyService,
  CurrencyShape,
} from '@shared/Currency';
import { DurationPipe } from '@shared/duration.pipe';
import { round } from '@utils/round';



@Component({
  imports: [
    PercentPipe,
    DurationPipe,

    MatCardModule,
    TranslatePipe,

    CurrencyComponent,
  ],

  selector: 'deposit-summary',
  templateUrl: 'deposit-summary.component.html',

  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'flex flex-col gap-[16px]'
  },
})
export class DepositSummaryComponent {
  public readonly deposit = input<DepositModel>(DepositModel.Empty());
  public readonly inflation = input<number>(0);

  public depositInUserCurrency: WritableSignal<number>;
  public depositCurrencyRate: WritableSignal<number>;
  public userCurrency: CurrencyShape;

  public constructor(
    private _currency: CurrencyService,
    private _converter: CurrencyConverterService,
    private _currencyRates: CurrencyRatesService,
  ) {
    this.depositInUserCurrency = signal(-1);
    this.depositCurrencyRate   = signal(-1);

    this.userCurrency = this._currency.preferredCurrency()!;

    effect(() => {
      const deposit = this.deposit();
      this.userCurrency = this._currency.preferredCurrency()!;

      if (deposit.currency().code === this.userCurrency.code) {
        this.depositInUserCurrency.set(-1)
        return;
      }

      const crossRate = this._currencyRates.crossRate(
        deposit.currency().code,
        this.userCurrency.code
      );

      this.depositCurrencyRate.set(round(crossRate, 4));

      const depositCurrencyRate = this._currencyRates.getRate(
        this.deposit().currency().code
      );

      this.depositInUserCurrency.set(
        this._converter.convert(
          this.deposit().realNet(),
          depositCurrencyRate!.code,
          this.userCurrency.code,
          CurrencyConvertSide.Equal
        )
      );
    });
  }
}
