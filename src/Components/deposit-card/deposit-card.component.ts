import { PercentPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

import { CurrencyComponent } from '@components/currency';
import { DepositModel } from '@features/calculator/model';
import { DurationPipe } from '@shared/duration.pipe';



@Component({
  imports: [
    MatCardModule,
    MatIconModule,
    TranslatePipe,
    PercentPipe,

    CurrencyComponent,
    DurationPipe,
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



  public emitEditDeposit(event: Event) {
    this.editDeposit.emit(event);
  }

  public emitRemoveDeposit(event: Event) {
    this.removeDeposit.emit(event);
  }
}
