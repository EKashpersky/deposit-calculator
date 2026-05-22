import { CurrencyPipe, getLocaleCurrencyCode, PercentPipe } from '@angular/common';
import { Component, computed, effect, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { DepositsManagerService } from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { ShortcutsService } from '@shared/shortcuts.service';

import { calculateDeposit } from '../calculator';
import {
  CompoundRate,
  DepositInput,
  DepositModel,
  Duration,
} from '../calculator/model';
import { DepositNameComponent } from './deposit-name.component';
import { UndoSnackbarComponent } from './undo-snackbar.component';



@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  imports: [
    CurrencyPipe,
    RouterLink,
    PercentPipe,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatSnackBarModule,
    TranslatePipe
  ],
})
export class DashboardPage {
  private _snackRef: MatSnackBarRef<UndoSnackbarComponent> | null;
  private _depositsManager = inject(DepositsManagerService);
  public deposits: Signal<DepositModel[]>;
  public readonly currency: string;



  public constructor(
    private _translate: TranslateService,
    private _dialog: MatDialog,
    private _snack: MatSnackBar,
    private _history: HistoryService,
    private _shortcuts: ShortcutsService,
  ) {
    const collator = new Intl.Collator(void 0, { usage: 'sort', numeric: true });
    this.deposits = computed(() => {
      return this._depositsManager.deposits().sort(
        (a, b) => collator.compare(a.name(), b.name())
      );
    });

    if (this.deposits().length === 0) {
      this._depositsManager.addDepositsBulk(this._mockDeposits());
    }

    effect(() => {
      this._shortcuts.undo();
      if (this._snackRef) {
        this._snackRef!.dismissWithAction();
        this._snackRef = null;
      }
    });

    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;

    this._snackRef = null;
  }

  /// Edit deposit name
  public editDeposit(event: Event, deposit: DepositModel) {
    event.preventDefault();
    event.stopImmediatePropagation();

    return Promise.resolve(
      this._depositsManager.deposits().map(deposit => deposit.name())
    ).then(depositsNames => {
      return this._dialog.open(DepositNameComponent, {
        data: {
          i18nTitle: 'dashboard.deposit_dialog.edit_title',
          i18nAction: 'dashboard.deposit_dialog.edit',
          depositName: deposit.name(),
          depositsNames,
        },
      });
    }).then(dialog => {
      return firstValueFrom(dialog.afterClosed());
    }).then((newName: string) => {
      if (typeof newName !== 'string') {
        return;
      }

      const renameDepositAction = this._depositsManager.renameDeposit(
        deposit.name(),
        newName,
      );
      this._history.addAction(renameDepositAction);

      this._snackRef = this._snack.openFromComponent(UndoSnackbarComponent, {
        duration: 5000,
        data: {
          i18nTitle: 'dashboard.undo_snackbar',
          i18nAction: 'common_buttons.restore',
        }
      });

      this._snackRef.onAction().subscribe(() => {
        this._history.tryUndo(renameDepositAction);
      });
    });
  }

  public removeDeposit(event: Event, deposit: DepositModel) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const removeDepositAction = this._depositsManager.removeDeposit(deposit);
    this._history.addAction(removeDepositAction);

    this._snackRef = this._snack.openFromComponent(UndoSnackbarComponent, {
      duration: 5000,
      data: {
        i18nTitle: 'dashboard.undo_snackbar',
        i18nAction: 'common_buttons.restore',
      }
    });

    this._snackRef.onAction().subscribe(() => {
      this._history.tryUndo(removeDepositAction);
    });

    return false;
  }



  private _mockDeposits(): DepositModel[] {
    const depositInput = new DepositInput(
      10000,
      0.12,
      new Duration('months', 12),
      100,
      0.23,
      CompoundRate.MONTHLY,
      true
    );

    const depositResult = calculateDeposit(depositInput);

    return [0, 1, 2].map(i => {
      return new DepositModel(
        `Deposit ${i}`,
        depositInput,
        depositResult
      );
    });
  }
}
