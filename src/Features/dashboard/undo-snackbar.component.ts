import { Component, Inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarLabel,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import FrameTicker from 'frame-ticker';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  host: {
    class: 'w-[calc(100%+8px)] block overflow-hidden rounded-(--mat-sys-corner-extra-small)',
  },
  selector: 'deposit-deleted-snackbar',
  template: `
    <div class="flex flex-row justify-between items-center pr-[8px]">
      <p matSnackBarLabel>{{ i18nTitle | translate }}</p>
      <div matSnackBarActions>
        <button matButton matSnackBarAction (click)="onAction()">
          {{ i18nAction | translate }}
        </button>
      </div>
    </div>

    <mat-progress-bar mode="determinate" [value]="ttl()"> </mat-progress-bar>
  `,
  styles: `
    @use '@angular/material' as mat;

    mat-progress-bar.tmp {
      @include mat.progress-bar-overrides(
        (
          active-indicator-color: orange,
          track-color: red,
        )
      );
    }

    mat-progress-bar ::ng-deep .mdc-linear-progress__bar.mdc-linear-progress__primary-bar {
      transition: none;
    }
  `,

  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
})
export class UndoSnackbarComponent {
  public readonly i18nTitle: string;
  public readonly i18nAction: string;

  public ttl = signal(100);

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) data: any,
    private _snackBarRef: MatSnackBarRef<UndoSnackbarComponent>,
  ) {
    this.i18nTitle = data.i18nTitle;
    this.i18nAction = data.i18nAction;

    const { duration } = this._snackBarRef.containerInstance.snackBarConfig;
    const createdAt = performance.now();

    let diff = 0;

    const looper = new FrameTicker();

    looper.onTick.add((currentTime: number) => {
      currentTime = performance.now();
      diff = currentTime - createdAt;

      this.ttl.set(100 - (diff / duration!) * 100);
    });
  }

  public onAction() {
    this._snackBarRef.dismissWithAction();
  }
}
