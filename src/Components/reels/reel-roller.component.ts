import {
  afterEveryRender,
  Component,
  input,
  untracked,
  viewChildren
} from '@angular/core';

import { ReelRollerModel } from './reel-roller.model';
import { ReelCellComponent } from './reel-cell.component';
import { ReelModel } from './reel.model';



@Component({
  selector: 'reel-roller',
  styleUrl: './reel-roller.component.scss',
  template: `
    @for (reelx of model().reels(); track $index) {
      <reel-cell [reel]="reelx" [size]="size()"></reel-cell>
    }
  `,

  host: {
    class: 'flex flex-row'
  },

  imports: [ ReelCellComponent ],
})
export class ReelRollerComponent {
  public cells = viewChildren(ReelCellComponent);



  public size = input<'big' | 'small' | ''>('');

  public model = input<ReelRollerModel<ReelModel<any>[]>>(ReelRollerModel.Empty());

  public constructor() {
    afterEveryRender(() => {
      this.cells();
      this.model();

      untracked(() => {
        for (const cell of this.cells()) {
          cell.measure();
        }
      });
    });
  }
}
