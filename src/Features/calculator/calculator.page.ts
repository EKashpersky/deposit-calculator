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

  public readonly result = signal<CalculatedDeposit>({
    gross: 0
  });

  public constructor(private _fb: FormBuilder) {
    
    this.calculatorForm = this._fb.group({
      initialDeposit: this._fb.control(0, Validators.min(0)),
      monthlyDeposit: this._fb.control(0, Validators.min(0)),
      annualInterest: this._fb.control(0, Validators.min(0)),
      monthsDuration: this._fb.control(0, Validators.min(0)),
    });

    this.calculatorForm.valueChanges.subscribe((form) => {
      const CAPITALIZATION = 12;

      const {
        initialDeposit: INDE,
        annualInterest: ANIN,
        monthsDuration: MODU,
        monthlyDeposit: MODE,
      } = form;

      if (ANIN <= 0 || INDE <= 0 || MODU <= 0) {
        this.result.set({ gross: 0 });
        return;
      }

      const monthlyRate = (ANIN / 100) / CAPITALIZATION;

      let gross = 0;
      if (monthlyRate <= 0) {
        // No interest case (works even if monthlyDeposit > 0)
        gross = INDE + MODE * MODU;
      } else {
        const power = (1 + monthlyRate) ** MODU;          // reuse for both parts

        const fvInitial       = INDE * power;
        const fvContributions = MODE * (power - 1) / monthlyRate;   // ← this is the magic line

        gross = fvInitial + fvContributions;
      }

      gross = +gross.toFixed(2);

      this.result.update(() => {
        return { gross };
      });
    });
  }
}
