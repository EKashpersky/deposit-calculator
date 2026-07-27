import { Component, computed, input } from '@angular/core';

import { ReelModel } from './reel.model';



@Component({
  selector: 'reel-cell',
  templateUrl: './reel-cell.component.html',
  styleUrl: './reel-cell.component.scss',

  host: {
    class: 'h-[1.5em] overflow-hidden'
  }
})
export class ReelCellComponent {
  public readonly reel = input<ReelModel<any>>(new ReelModel([]));

  public readonly reelIndex = computed(() => {
    return this.reel().indexOfValueInDictionary();
  })

  public constructor() {}
}
