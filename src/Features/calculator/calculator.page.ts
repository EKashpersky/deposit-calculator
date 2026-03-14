import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



interface CalculatedDeposit {
  readonly gross: number;
}

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.page.html',

  imports: [ MatFormFieldModule, MatInputModule, ReactiveFormsModule ]
})
export class CalculatorPage {
  public readonly calculatorForm: FormGroup;

  public readonly ready = signal(false);

  public readonly result = signal<CalculatedDeposit>({
    gross: 0
  });

  public constructor(private _fb: FormBuilder) {
    const CAPITALIZATION = 12;

    this.calculatorForm = this._fb.group({
      initialDeposit: this._fb.control(0, Validators.min(0)),
      monthlyDeposit: this._fb.control(0, Validators.min(0)),
      annualInterest: this._fb.control(0, Validators.min(0)),
      monthsDuration: this._fb.control(0, Validators.min(0)),
    });

    this.calculatorForm.valueChanges.subscribe((form) => {
      const { initialDeposit: INDE, annualInterest: ANIN, monthsDuration: MODU } = form;

      if (ANIN <= 0 || INDE <= 0 || MODU <= 0) {
        this.ready.set(false);
        return;
      }

      const gross = INDE * (1 + ANIN / CAPITALIZATION) ** MODU

      this.result.update(() => {
        return { gross };
      });

      this.ready.set(true);

    });
  }
}
