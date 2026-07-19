import {
  AfterContentInit,
  Component,
  contentChildren,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'overview-column',
  templateUrl: 'overview-column.component.html',
  styleUrl: 'overview-column.component.scss',
  imports: [MatDividerModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'flex flex-col gap-[8px]',
  },
})
export class OverviewColumnComponent implements AfterContentInit {
  public readonly texts = contentChildren<ElementRef>('text');
  public readonly values = contentChildren<ElementRef>('value');

  public constructor() {}

  public ngAfterContentInit() {}
}
