import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { DepositModel } from '@features/calculator/model';
import { CurrencyService, CurrencyShape } from '@shared/currency.service';
import { DurationPipe } from '@shared/duration.pipe';

import { OverviewColumnComponent } from './overview-column.component';

@Component({
  imports: [
    CurrencyPipe,
    PercentPipe,

    MatCardModule,
    TranslatePipe,

    DurationPipe,
    OverviewColumnComponent,
  ],

  selector: 'deposit-summary',
  templateUrl: 'deposit-summary.component.html',

  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'flex flex-row justify-stretch w-full flex-wrap gap-[16px] h-min',
  },
})
export class DepositSummaryComponent {
  public readonly deposit = input<DepositModel>(DepositModel.Empty());

  public readonly currency: Signal<CurrencyShape>;

  public constructor(private _currency: CurrencyService) {
    this.currency = this._currency.currency;
  }
}
