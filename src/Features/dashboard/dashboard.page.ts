import { CurrencyPipe, getLocaleCurrencyCode, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { calculateDeposit } from '../calculator/calculator.model';
import {
  CompoundRate,
  DepositInput,
  Duration,
  DepositModel
} from '../calculator/model';



@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    CurrencyPipe,
    RouterLink,
    PercentPipe,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    TranslatePipe
  ],
})
export class DashboardPage {
  public deposits = signal<DepositModel[]>([]);

  public readonly currency: string;

  public constructor(
    private _translate: TranslateService
  ) {
    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;

    const depositInput = new DepositInput(
      10000,
      0.16,
      new Duration('months', 12),
      100,
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

    this.deposits.set([ deposit, deposit, deposit ]);
  }

}
