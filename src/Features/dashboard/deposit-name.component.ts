import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'deposit-name',
  template: `
    <h2 mat-dialog-title>{{ 'dashboard.deposit.name' | translate }}</h2>
    <mat-dialog-content>
      <input matInput [(ngModel)]="name" cdkFocusInitial />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close] (click)="save()">{{ 'dashboard.edit_deposit.save' | translate }}</button>
      <button matButton [mat-dialog-close]>{{ 'dashboard.edit_deposit.cancel' | translate }}</button>
    </mat-dialog-actions>
  `,

  imports: [ MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, TranslatePipe ]
})
export class DepositNameComponent {
  public name = model('');

  private _depositName: string;

  public constructor(private _dialogRef: MatDialogRef<DepositNameComponent>) {
    this._depositName = inject(MAT_DIALOG_DATA);

    this.name.set(this._depositName);
  }

  public save() {
    this._dialogRef.close(this.name());
  }
}
