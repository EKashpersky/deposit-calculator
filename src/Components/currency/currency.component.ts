import { Component, computed, input } from '@angular/core';


import { CurrencySymbolEnum } from '@config/supported-currencies';
import { ReelRollerComponent } from '@components/reels';
import { round } from '@utils/round';

import { reelRollerCurrencyFactory } from './reel-roller-currency.factory';



@Component({
  selector: 'currency',
  templateUrl: 'currency.component.html',
  imports: [ReelRollerComponent]
})
export class CurrencyComponent {
  public readonly currency = input<CurrencySymbolEnum>();
  public readonly value = input<number>(0);

  public readonly model = computed(
    () => reelRollerCurrencyFactory(
      this.currency()!,
      round(this.value(), 2),
      true
    )
  )
}