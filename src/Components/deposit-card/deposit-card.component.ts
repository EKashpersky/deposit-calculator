import { CurrencyPipe, PercentPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { DepositModel } from '@features/calculator/model';
import { DurationPipe } from '@shared/duration.pipe';
import { MatButtonModule } from "@angular/material/button";



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



}
