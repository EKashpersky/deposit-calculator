import { CurrencyPipe, getLocaleCurrencyCode, PercentPipe } from '@angular/common';
import { Component, computed, effect, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
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

import { DepositBridgeService, DepositsManagerService } from '@shared/deposits';
import { HistoryService } from '@shared/history';
import { ShortcutsService } from '@shared/shortcuts.service';

import {
  CompoundRate,
  DepositFlags,
  DepositInput,
  DepositModel,
  Duration,
} from '@features/calculator/model';
import { calculateDeposit } from '../calculator';
import { DepositNameComponent } from './deposit-name.component';
import { UndoSnackbarComponent } from './undo-snackbar.component';
import { DurationPipe } from '@shared/duration.pipe';
import { Currency, CurrencyService, CurrencyShape } from '@shared/currency.service';



function templateDeposit() {
  const depositInput = DepositInput.New(
    10000,
    12,
    new Duration('months', 12),
    100,
    23,
    CompoundRate.MONTHLY,
    DepositFlags.Create(true, true)
  );

  return depositInput;
}

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',

  host: {
    class: 'flex flex-col gap-[20px]'
  },

  imports: [
    CurrencyPipe,
    PercentPipe,
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatSnackBarModule,
    TranslatePipe,

    DurationPipe,
],
})
export class DashboardPage {
  private _snackRef: MatSnackBarRef<UndoSnackbarComponent> | null;
  private _depositsManager = inject(DepositsManagerService);
  public deposits: Signal<DepositModel[]>;
  public readonly currency: Signal<CurrencyShape>;



  public constructor(
    private _translate: TranslateService,
    private _dialog: MatDialog,
    private _snack: MatSnackBar,
    private _history: HistoryService,
    private _shortcuts: ShortcutsService,
    private _depositBridge: DepositBridgeService,
    private _currency: CurrencyService,
  ) {
    const collator = new Intl.Collator(void 0, { usage: 'sort', numeric: true });
    this.deposits = computed(() => {
      return this._depositsManager.deposits().sort(
        (a, b) => collator.compare(a.name(), b.name())
      );
    });

    this.currency = this._currency.currency;

    effect(() => {
      this._shortcuts.undo();
      if (this._snackRef) {
        this._snackRef!.dismissWithAction();
        this._snackRef = null;
      }
    });


    this._depositBridge.deposit.subscribe((deposit) => {
      if (deposit) {
        const updateDepositAction = this._depositsManager.updateDeposit(
          deposit
        );

        this._history.addAction(updateDepositAction);
      }
    });

    this._snackRef = null;
  }

  public addDeposit(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();


    const dialogRef = this._dialog.open(DepositNameComponent, {
      data: {
        i18nTitle: 'dashboard.deposit_dialog.create_title',
        i18nAction: 'dashboard.deposit_dialog.create',
        depositName: '',
        depositNames: [],
      },
    });

    firstValueFrom(dialogRef.afterClosed()).then(depositName => {
      if (typeof depositName !== 'string') {
        return;
      }

      const depositInput = templateDeposit();
      const depositResult = calculateDeposit(depositInput);
      const addDepositAction = this._depositsManager.addDeposit(
        new DepositModel(depositName, depositInput, depositResult)
      );
      this._history.addAction(addDepositAction);
    });
  }

  /// Edit deposit name
  public editDeposit(event: Event, deposit: DepositModel) {
    event.preventDefault();
    event.stopImmediatePropagation();

    return Promise.resolve(
      this._depositsManager.deposits().map(deposit => deposit.name())
    ).then(depositNames => {
      return this._dialog.open(DepositNameComponent, {
        data: {
          i18nTitle: 'dashboard.deposit_dialog.edit_title',
          i18nAction: 'dashboard.deposit_dialog.edit',
          depositName: deposit.name(),
          depositNames,
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
          i18nTitle: 'dashboard.deposit_dialog.snackbar.deposit_renamed',
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
        i18nTitle: 'dashboard.deposit_dialog.snackbar.deposit_removed',
        i18nAction: 'common_buttons.restore',
      }
    });

    this._snackRef.onAction().subscribe(() => {
      this._history.tryUndo(removeDepositAction);
    });

    return false;
  }
}
