import {
  Component,
  computed,
  ElementRef,
  input,
  signal,
} from '@angular/core';

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

  /**
   * Used to decide on animation type
  **/
  public readonly size = input<'big' | 'small' | ''>('');


  public readonly reelIndex = computed(() => {
    return this.reel().indexOfValueInDictionary();
  });

  private _width = signal<string>('unset');



  public constructor(private _host: ElementRef<HTMLElement>) { }

  public width() {
    return this._width();
  }



  public measure() {
    if (this.reel().variable()) {
      this._updateReelWindowSize(this.reel().indexOfValueInDictionary());
    }
  }

  private _updateReelWindowSize(reelIndex: number) {
    const reels = this._host.nativeElement.children[0];

    const reelCellElement = reels.children.item(reelIndex) as HTMLElement;
    reelCellElement && this._width.set(`${reelCellElement.clientWidth}px`);
  }
}
