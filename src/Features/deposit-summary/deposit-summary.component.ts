import { PercentPipe } from '@angular/common';
import {
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
  CurrencyOpsService,
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

})
export class DepositSummaryComponent {
  public readonly deposit = input<DepositModel>(DepositModel.Empty());
  public readonly inflation = input<number>(0);

  public depositInUserCurrency: WritableSignal<number>;
  public depositCurrencyRate: WritableSignal<number>;
  public userCurrency: CurrencyShape;

  public constructor(
    private _currency: CurrencyService,
    private _currencyOps: CurrencyOpsService,
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

      const crossRate = this._currencyOps.crossRate(
        deposit.currency().code,
        this.userCurrency.code
      );

      this.depositCurrencyRate.set(round(crossRate, 4));

      this.depositInUserCurrency.set(
        this._currencyOps.exchangeMid(
          this.deposit().realNet(),
          this.deposit().currency().code,
          this.userCurrency.code,
        )
      );
    });
  }
}
