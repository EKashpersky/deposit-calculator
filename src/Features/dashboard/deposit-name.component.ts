import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';



function validatorUnique(strings: string[], uniqueString: string) {
  return (control: AbstractControl) => {
    return strings.includes(control.value) && control.value !== uniqueString
      ? { notUnique: true }
      : null;
  }
}

class InstantErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched) || false;
  }
}



@Component({
  selector: 'deposit-name',
  template: `
    <h2 mat-dialog-title>{{ i18nTitle | translate }}</h2>
    <mat-dialog-content>
      <mat-form-field class="w-full">
        <mat-label>{{ 'dashboard.deposit.name' | translate }}</mat-label>
        <input
          matInput
          [formControl]="name"
          cdkFocusInitial
          [errorStateMatcher]="errorStateMatcher"
        />

        @if (name.hasError('notUnique')) {
          <mat-error>{{ 'dashboard.deposit_dialog.not_unique' | translate }}</mat-error>
        } @else if (name.hasError('required')) {
          <mat-error>{{ 'dashboard.deposit_dialog.required' | translate }}</mat-error>
        }
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="start">
      <button matButton="filled" [mat-dialog-close] (click)="save()" [disabled]="name.invalid">{{ i18nAction | translate }}</button>
      <button matButton [mat-dialog-close]>{{ 'dashboard.deposit_dialog.cancel' | translate }}</button>
    </mat-dialog-actions>
  `,

  imports: [
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ]
})
export class DepositNameComponent {
  public readonly i18nTitle: string;
  public readonly i18nAction: string; /// Create or Edit action

  public readonly name: FormControl;
  public readonly errorStateMatcher: ErrorStateMatcher;
  public readonly depositNames: string[];

  public constructor(private _dialogRef: MatDialogRef<DepositNameComponent>) {
    const data = inject(MAT_DIALOG_DATA);

    this.errorStateMatcher = new InstantErrorStateMatcher();

    this.i18nTitle = data.i18nTitle;
    this.i18nAction = data.i18nAction;

    this.depositNames = data.depositsNames;

    this.name = inject(FormBuilder).control(data.depositName, {
      validators: Validators.compose([
        validatorUnique(this.depositNames, data.depositName),
        Validators.required
      ])
    });
  }

  public save() {
    this._dialogRef.close(this.name.value);
  }
}
