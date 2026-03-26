import { CurrencyPipe, getLocaleCurrencyCode, getLocaleCurrencySymbol } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { calculateDeposit, DepositInput } from './calculator.model';
import {
  DurationInMonths,
  DurationInYears,
  DurationScaleShape,
  InterestResult
} from './duration-scale.model';




export const COMPOUND_RATES_MAP_FROM_I18N = [ 0, 1, 3, 6, 12, 365.25 ] as const;

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.page.html',

  host: {
    class: 'flex flex-row gap-[16px] p-[24px]'
  },

  imports: [
    ReactiveFormsModule,

    CurrencyPipe,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    TranslatePipe,
  ]
})
export class CalculatorPage {
  public readonly calculatorForm: FormGroup;
  public readonly currency: string;
  public readonly currencySign: string;
  public readonly compoundRates: { value: number, label: string }[];
  public readonly durationScales: DurationScaleShape[];

  public readonly durationScale = signal<DurationScaleShape>(new DurationInYears());
  public readonly result = signal<InterestResult>(InterestResult.empty());

  public constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService
  ) {
    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;
    this.currencySign = getLocaleCurrencySymbol(this._translate.getCurrentLang())!;

    this.durationScales = [
      new DurationInYears(),
      new DurationInMonths(),
    ];

    this.compoundRates = COMPOUND_RATES_MAP_FROM_I18N.map((value, i) => {
      return { value, label: `calculator.compound_rates.${i}` };
    });

    this.calculatorForm = this._fb.group({
      principal: this._fb.control(10000, Validators.min(0)),
      annualRate: this._fb.control(16, Validators.min(0)),
      durationInMonths: this._fb.control(2, Validators.min(0)),
      monthlyDeposit: this._fb.control(0, Validators.min(0)),
      tax: this._fb.control(23, Validators.min(0)),
      withTaxes: this._fb.control(true),

      compoundRate: this._fb.control(4),
    });

    this.calculatorForm.valueChanges.subscribe(() => {
      this._recalculateResult();
    });

    this._recalculateResult();
  }

  public changeDurationScale(durationScale: 'years' | 'months') {
    this.durationScale.set(this.durationScales.find(
      durationScalex => durationScalex.name === durationScale
    )!);

    this._recalculateResult();
  }



  private _recalculateResult() {
    const {
      principal,
      annualRate,
      durationInMonths: duration,
      monthlyDeposit,
      compoundRate,
      tax,
      withTaxes,
    } = this.calculatorForm.value;

    if (principal <= 0 || annualRate <= 0 || duration <= 0) {
      this.result.set(InterestResult.empty());
      return;
    }

    const compoundRateValue = this.compoundRates[parseInt(compoundRate)].value;

    const taxValue = withTaxes ? parseInt(tax) / 100 : 0;

    const depositInput = new DepositInput(
      parseInt(principal),
      parseInt(annualRate) / 100,
      parseInt(duration),
      parseInt(monthlyDeposit),
      taxValue,
      compoundRateValue,
    );

    const result = calculateDeposit(
      this.durationScale(),
      depositInput
    );

    this.result.set(result);
  }
}
