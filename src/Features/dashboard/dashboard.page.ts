import { CurrencyPipe, getLocaleCurrencyCode, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { DepositsManagerService } from '@shared/deposits';

import { calculateDeposit } from '../calculator';
import {
  CompoundRate,
  DepositInput,
  DepositModel,
  Duration,
} from '../calculator/model';
import { DepositNameComponent } from './deposit-name.component';



@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
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
  private _depositsManager = inject(DepositsManagerService);
  public deposits = this._depositsManager.deposits;

  public readonly currency: string;

  public constructor(
    private _translate: TranslateService,
    private _dialog: MatDialog,
  ) {
    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;

    if (this.deposits().length === 0) {
      this._depositsManager.addDeposits(this._mockDeposits());
    }
  }

  /// Edit deposit name
  public editDeposit(event: Event, deposit: DepositModel) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this._depositsManager.getUserDeposits().then(deposits => {
      return deposits.map(deposit => deposit.name());
    }).then(depositsNames => {
      return this._dialog.open(DepositNameComponent, {
        data: {
          i18nTitle: 'dashboard.deposit_dialog.edit_title',
          i18nAction: 'dashboard.deposit_dialog.edit',
          depositName: deposit.name(),
          depositsNames,
        },
      });
    }).then(dialog => {
      return firstValueFrom(dialog.afterClosed());
    }).then((depositName: string) => {
      if (depositName) {
        this._depositsManager.renameDeposit(depositName, deposit);
      }
    });

    return false;
  }

  public removeDeposit(event: Event, deposit: DepositModel) {
    this._depositsManager.removeDeposit(deposit.name());

    event.preventDefault();
    event.stopImmediatePropagation();

    return false;
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
