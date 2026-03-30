import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

import { DepositInput } from '../calculator/deposit-input.model';
import { DepositModel } from '../calculator/deposit.model';
import { Duration } from '../calculator/duration.model';
import { CompoundRate } from '../calculator/compound-rate.enum';
import { calculateDeposit } from '../calculator/calculator.model';




@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    RouterLink,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,

    TranslatePipe
  ],
})
export class DashboardPage {
  public pageName = signal('Dashboard page!');

  public deposits = signal<DepositModel[]>([]);

  public constructor() {
    const depositInput = new DepositInput(
      10000,
      0.16,
      new Duration('months', 12),
      0,
      0.23,
      CompoundRate.MONTHLY,
      true
    );

    const depositResult = calculateDeposit(depositInput);

    const deposit = new DepositModel(
      'Deposit 1',
      depositInput,
      depositResult
    );

    this.deposits.set([
      deposit
    ]);
  }



}
