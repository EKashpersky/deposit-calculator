import { Component, computed, inject, input } from '@angular/core';


import { ReelRollerComponent } from '@components/reels';
import { reelRollerCurrencyFactory } from './reel-roller-currency.factory';
import { CurrencyCharEnum, CurrencyService } from '@shared/currency.service';
import { round } from '@utils/round';



@Component({
  selector: 'currency',
  templateUrl: 'currency.component.html',
  imports: [ReelRollerComponent]
})
export class CurrencyComponent {
  public readonly currency = input<CurrencyCharEnum>();
  public readonly value = input<number>(0);

  public readonly model = computed(
    () => reelRollerCurrencyFactory(
      this.currency()!,
      round(this.value(), 2),
      true
    )
  )
}