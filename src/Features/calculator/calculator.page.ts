import {
  CurrencyPipe,
  getLocaleCurrencyCode,
  getLocaleCurrencySymbol
} from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { calculateDeposit } from './calculator.model';
import { CompoundRate, DepositInput, Duration, DepositResult } from './model';



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
    MatDividerModule,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage {
  public readonly calculatorForm: FormGroup;
  public readonly currency: string;
  public readonly currencySign: string;
  public readonly compoundRates: { value: number, label: string }[];

  public readonly duration = signal(new Duration('months', 24));
  public readonly result = signal<DepositResult>(DepositResult.empty());

  public constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService,
  ) {
    const COMPOUND_RATES_MAP_FROM_I18N = [
      CompoundRate.NO_COMPOUND,
      CompoundRate.ANNUALLY,
      CompoundRate.HALF_YEARLY,
      CompoundRate.QUARTERLY,
      CompoundRate.MONTHLY,
      CompoundRate.DAILY
    ] as const;

    this.compoundRates = COMPOUND_RATES_MAP_FROM_I18N.map((value, i) => {
      return { value, label: `calculator.compound_rates.${i}` };
    });

    this.currency = getLocaleCurrencyCode(this._translate.getCurrentLang())!;
    this.currencySign = getLocaleCurrencySymbol(this._translate.getCurrentLang())!;

    this.calculatorForm = this._fb.group({
      principal: this._fb.control(10000, Validators.min(0)),
      annualRate: this._fb.control(16, Validators.min(0)),

      monthlyDeposit: this._fb.control(0, Validators.min(0)),
      noFirstMonthDeposit: this._fb.control(true),

      tax: this._fb.control(23, Validators.min(0)),
      withTaxes: this._fb.control(true),

      duration: this._fb.group({
        value: this._fb.control(this.duration().duration(), Validators.min(0)),
        scale: this._fb.control(this.duration().scale(), Validators.required),
      }),

      compoundRate: this._fb.control(4),
    });

    this.calculatorForm.get('duration')!.valueChanges.subscribe(group => {
      this.duration.update(
        duration => duration.update(group.value, group.scale)
      );

      this.calculatorForm.get('duration')!.get('value')!.setValue(
        this.duration().duration(),
        { emitEvent: false, emitModelToViewChange: true, }
      );
    });

    /// Re-calculate result when form values changes
    this.calculatorForm.valueChanges.subscribe(() => {
      this._recalculateResult();
    });

    /// Initial calculation
    this._recalculateResult();
  }



  private _recalculateResult() {
    const {
      principal,
      annualRate,
      monthlyDeposit,
      tax,
      withTaxes,
      compoundRate,
      durationInMonths: duration,
      noFirstMonthDeposit,
    } = this.calculatorForm.value;

    if (principal <= 0 || annualRate <= 0 || duration <= 0) {
      this.result.set(DepositResult.empty());
      return;
    }

    const compoundRateValue = this.compoundRates[parseInt(compoundRate)].value;

    const taxValue = withTaxes ? parseFloat(tax) / 100 : 0;

    const depositInput = new DepositInput(
      parseInt(principal),
      parseFloat(annualRate) / 100,
      this.duration(),
      parseInt(monthlyDeposit),
      taxValue,
      compoundRateValue,
      noFirstMonthDeposit,
    );

    const result = calculateDeposit(depositInput);

    this.result.set(result);
  }
}
