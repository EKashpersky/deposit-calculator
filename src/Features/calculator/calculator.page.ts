import { CurrencyPipe, getLocaleCurrencyCode } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';



interface CalculatedDeposit {
  readonly gross: number;
  readonly interest: number;
  readonly deposited: number;
}


function calculateDeposit(
  principal: number,
  duration: number,           // in months
  annualInterest: number,     // 15 = 15%
  compoundRate: number,       // ← 12 = monthly (your case), 6 = semi-annual, 4 = quarterly, 1 = yearly
  monthlyDeposit: number = 0
) {
  if (duration <= 0 || principal <= 0) {
    return { gross: principal, interest: 0, deposited: principal };
  }

  const annualRate = annualInterest / 100;
  let total: number;

  /// No interest
  if (annualRate <= 0 || compoundRate <= 0) {
    total = principal + monthlyDeposit * duration;
  } else {

    const ratePerPeriod = annualRate / compoundRate;
    const monthlyRate   = Math.pow(1 + ratePerPeriod, compoundRate / 12) - 1;

    const power = (1 + monthlyRate) ** duration;

    const fvInitial       = principal * power;
    const fvContributions = monthlyDeposit * (power - 1) / monthlyRate;

    total = fvInitial + fvContributions;
  }

  const deposited = principal + monthlyDeposit * duration;
  const interest  = total - deposited;

  return {
    gross:     Number(total.toFixed(2)),
    interest:  Number(interest.toFixed(2)),
    deposited: Number(deposited.toFixed(2))
  };
}




export const COMPOUND_RATES_MAP_FROM_I18N = [ 0, 1, 3, 6, 12 ] as const;

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.page.html',

  imports: [
    ReactiveFormsModule,

    CurrencyPipe,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
  ]
})
export class CalculatorPage {
  public readonly calculatorForm: FormGroup;
  public readonly currency: string;

  public readonly compoundRates: { value: number, label: string }[];

  public readonly result = signal<CalculatedDeposit>({
    gross: 0,
    interest: 0,
    deposited: 0,
  });

  public constructor(private _fb: FormBuilder, private _translate: TranslateService) {
    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;

    this.compoundRates = COMPOUND_RATES_MAP_FROM_I18N.map((value, i) => {
      return { value, label: `calculator.compound_rates.${i}` };
    });

    this.calculatorForm = this._fb.group({
      initialDeposit: this._fb.control(0, Validators.min(0)),
      monthlyDeposit: this._fb.control(0, Validators.min(0)),
      annualInterest: this._fb.control(0, Validators.min(0)),
      monthsDuration: this._fb.control(0, Validators.min(0)),

      compoundRate: this._fb.control(1),
    });

    this.calculatorForm.valueChanges.subscribe((form) => {
      const {
        initialDeposit: principal,
        annualInterest,
        monthsDuration: duration,
        monthlyDeposit,
        compoundRate,
      } = form;

      if (annualInterest <= 0 || principal <= 0 || duration <= 0) {
        this.result.set({ gross: 0, interest: 0, deposited: 0 });
        return;
      }

      this.result.update(() => {
        return calculateDeposit(
          parseInt(principal),
          parseInt(duration),
          parseInt(annualInterest),
          parseInt(compoundRate),
          parseInt(monthlyDeposit),
        );
      });
    });
  }
}
