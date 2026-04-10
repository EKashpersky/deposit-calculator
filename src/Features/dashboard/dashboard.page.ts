import { CurrencyPipe, getLocaleCurrencyCode, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { DepositsManagerService } from '@shared/deposits';

import {
  CompoundRate,
  DepositInput,
  DepositModel,
  Duration,
} from '../calculator/model';
import { calculateDeposit } from '../calculator';



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

  providers: [ DepositsManagerService ],
})
export class DashboardPage {
  private _depositsManager = inject(DepositsManagerService);
  public deposits = this._depositsManager.deposits;

  public readonly currency: string;

  public constructor(
    private _translate: TranslateService,
  ) {
    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;

    if (this.deposits().length === 0) {
      this._depositsManager.addDeposits(this._mockDeposits());
    }
  }



  private _mockDeposits(): DepositModel[] {
    const depositInput = new DepositInput(
      10000,
      0.12,
      new Duration('months', 12),
      100,
      0.23,
      CompoundRate.MONTHLY,
      true
    );

    const depositResult = calculateDeposit(depositInput);

    return [0, 1, 2].map(i => {
      return new DepositModel(
        `Deposit ${i}`,
        depositInput,
        depositResult
      );
    });
  }
}
