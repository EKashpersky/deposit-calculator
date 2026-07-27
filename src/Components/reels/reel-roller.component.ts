import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ReelRollerModel } from './reel-roller.model';
import { ReelCellComponent } from './reel-cell.component';



@Component({
  selector: 'reel-roller',
  templateUrl: './reel-roller.component.html',
  styleUrl: './reel-roller.component.scss',

  host: {
    class: 'flex flex-row'
  },

  imports: [ ReelCellComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReelRollerComponent {
  public model = input<ReelRollerModel<any[]>>(ReelRollerModel.Empty());

  public constructor() { }
}
