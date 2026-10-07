import { CurrencyPipe, NgTemplateOutlet, PercentPipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  WritableSignal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from "@angular/material/button";
import { DepositModel } from '@features/calculator/model';
import {
  CurrencyConverterService,
  CurrencyConvertSide,
  CurrencyRatesService,
  CurrencyService,
  CurrencyShape,
  getDefaultCurrency,
} from '@shared/Currency';
import { DurationPipe } from '@shared/duration.pipe';
import { round } from '@utils/round';



@Component({
  imports: [
    MatCardModule,
    MatIconModule,
    MatRippleModule,
    TranslatePipe,
    CurrencyPipe,
    PercentPipe,
    DurationPipe,
    MatButtonModule,
    NgTemplateOutlet
  ],

  selector: 'deposit-card',
  templateUrl: 'deposit-card.component.html',
  host: {
    class: 'flex h-full w-full'
  }
})
export class DepositCardComponent {
  public readonly deposit = input<DepositModel>(DepositModel.Empty());

  public readonly editDeposit = output<Event>();
  public readonly removeDeposit = output<Event>();

  public readonly translate = inject(TranslateService);

  private _depositAmount: WritableSignal<number>;
  private _depositCurrency: WritableSignal<CurrencyShape>;
  private _depositCurrencyRate: WritableSignal<number>;



  public constructor(
    private _currency: CurrencyService,
    private _currencyRates: CurrencyRatesService,
    private _converter: CurrencyConverterService,
  ) {
    this._depositAmount       = signal(-1);
    this._depositCurrencyRate = signal(-1);
    this._depositCurrency     = signal(getDefaultCurrency());



    effect(() => {
      const deposit = this.deposit();
      const userCurrency = this._currency.preferredCurrency()!;

      if (deposit.currency().code !== userCurrency.code) {
        this._depositCurrency.set(userCurrency);

        const crossRate = this._currencyRates.crossRate(
          deposit.currency().code,
          userCurrency.code
        );

        this._depositCurrencyRate.set(round(crossRate, 2));

        const depositCurrencyRate = this._currencyRates.getRate(
          this.deposit().currency().code
        );

        this._depositAmount.set(
          this._converter.convert(
            this.deposit().realNet(),
            depositCurrencyRate!.code,
            userCurrency.code,
            CurrencyConvertSide.Equal
          )
        );
      } else {
        this._depositAmount.set(deposit.realNet());
        this._depositCurrencyRate.set(-1);
        this._depositCurrency.set(deposit.currency());
      }
    });
  }



  public depositAmount() {
    return this._depositAmount();
  }

  public depositCurrencyRate() {
    return this._depositCurrencyRate();
  }

  public depositCurrency() {
    return this._depositCurrency();
  }
}
