import {
  CurrencyPipe,
  getLocaleCurrencyCode,
  getLocaleCurrencySymbol,
  PercentPipe
} from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { DepositModel } from '@features/calculator/model';

import { OverviewColumnComponent } from './overview-column.component';


@Component({
  imports: [
    TranslatePipe,
    CurrencyPipe,
    MatCardModule,
    PercentPipe,

    OverviewColumnComponent,
  ],

  selector: 'deposit-summary',
  templateUrl: 'deposit-summary.component.html',

  host: {
    class: 'flex flex-row justify-stretch w-full flex-wrap gap-[16px] h-min'
  },
})
export class DepositSummaryComponent {
  public readonly deposit = input<DepositModel>(DepositModel.Empty());

  private _currency = signal({
    code: '',
    sign: '',
  });
  public readonly currency = this._currency.asReadonly();



  public constructor(
    private _translate: TranslateService,
  ) {
    this._currency.set({
      code: getLocaleCurrencyCode(this._translate.getCurrentLang())!,
      sign: getLocaleCurrencySymbol(this._translate.getCurrentLang())!,
    });
  }
}
