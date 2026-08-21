import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal
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
  private _injector = inject(Injector);

  public readonly reel = input<ReelModel<any>>(new ReelModel([]));

  public readonly reelIndex = computed(() => {
    return this.reel().indexOfValueInDictionary();
  });

  public readonly resize = input(false);

  private _width = signal<string>('unset');
  public width   = this._width.asReadonly();

  public constructor(private _host: ElementRef<HTMLElement>) { }

  public ngAfterViewInit() {
    if (this.reel().variable()) { 
      this._initReelWindowResize();
    }
  }



  private _initReelWindowResize() {
    const reels = this._host.nativeElement.children[0];

    effect(() => {
      const reelCellElement = reels.children.item(this.reelIndex())

      this._width.set(`${reelCellElement!.clientWidth}px`);
    }, { injector: this._injector });
  }
}
