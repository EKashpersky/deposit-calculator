import { PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { CurrencyComponent } from '@components/currency';
import { DepositModel } from '@features/calculator/model';
import { DurationPipe } from '@shared/duration.pipe';



@Component({
  imports: [
    PercentPipe,

    MatCardModule,
    TranslatePipe,

    CurrencyComponent,
    DurationPipe,
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

  public constructor() {}
}
