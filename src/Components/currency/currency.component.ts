import { formatCurrency } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ReelRollerComponent } from '@components/reels';
import { CurrencyShape } from '@shared/Currency';
import { round } from '@utils/round';

import { reelRollerCurrencyFactory } from './reel-roller-currency.factory';



@Component({
  selector: 'currency',
  templateUrl: 'currency.component.html',
  imports: [ReelRollerComponent]
})
export class CurrencyComponent {
  public readonly currency = input<CurrencyShape>();
  public readonly value = input<number>(0);
  public readonly variable = input<boolean>(false);
  public readonly size = input<'big' | 'small' | ''>('small');



  public constructor(private _translate: TranslateService) { }


  public readonly model = computed(() => {
    const formattedValue = formatCurrency(
      round(this.value(), 2),
      this._translate.currentLang()!,
      this.currency()!.symbol,
      this.currency()!.code,
      '0.2'
    );

    const result = reelRollerCurrencyFactory(
      this.currency()!.symbol,
      formattedValue,
      this.variable()
    );

    return result;
  })
}