import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { debounceTime, filter, map, take } from 'rxjs';

import { DepositSummaryComponent } from '@features/deposit-summary';
import {
  CurrencyConverterService,
  CurrencyConvertSide,
  CurrencyService,
  CurrencyShape,
  getDefaultCurrency,
} from '@shared/Currency';
import { DepositBridgeService } from '@shared/deposits';
import { DurationPipe } from '@shared/duration.pipe';
import { LoggerService, LoggerShape, ScopedLogger } from '@shared/logger';

import {
  AccrualFrequency,
  calculateDeposit,
  createDepositInput,
  DepositInput,
  DepositModel,
  Duration,
  TaxTiming,
} from './model';



@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.page.html',
  styleUrl: 'calculator.page.scss',
  host: {
    class: 'flex flex-col gap-[16px]'
  },

  imports: [
    ReactiveFormsModule,
    TitleCasePipe,

    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    TranslatePipe,

    DurationPipe,
    DepositSummaryComponent,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage {
  public readonly calculatorForm: FormGroup<{
    principal: FormControl<number>,
    annualRate: FormControl<number>,
    duration: FormGroup<{
      value: FormControl<number>,
      scale: FormControl<'years' | 'months'>,
    }>,
    monthlyDeposit: FormControl<number>,

    accrualFrequency: FormControl<AccrualFrequency>,
    capitalization: FormControl<boolean>,

    currency: FormControl<CurrencyShape>,
    autoConversion: FormControl<boolean>,

    taxRate: FormControl<number>,
    taxTiming: FormControl<TaxTiming>,

    noFirstMonthDeposit: FormControl<boolean>,
  }>;
  public readonly accrualFrequencies: { value: number, label: string }[];
  public readonly duration = signal(new Duration('months', 24));

  public readonly currencies = signal<CurrencyShape[]>([]);
  public readonly currency = signal<CurrencyShape | null>(null);

  public formChanged = signal(false);

  private _deposit = signal<DepositModel>(DepositModel.Empty());
  public readonly deposit = this._deposit.asReadonly();


  private _logger: LoggerShape;



  public constructor(
    private _fb: FormBuilder,
    private _depositBridge: DepositBridgeService,
    private _currency: CurrencyService,
    private _currencyConversion: CurrencyConverterService,
  ) {
    this._logger = new ScopedLogger('CalculatorPage', inject(LoggerService));

    const ACCRUAL_FREQUENCIES_MAP_FROM_I18N = [
      AccrualFrequency.ANNUALLY,
      AccrualFrequency.HALF_YEARLY,
      AccrualFrequency.QUARTERLY,
      AccrualFrequency.MONTHLY,
      AccrualFrequency.DAILY
    ] as const;

    this.accrualFrequencies = ACCRUAL_FREQUENCIES_MAP_FROM_I18N.map((value, i) => {
      return { value, label: `calculator.compound_rates.${i}` };
    });

    this.currencies.set(this._currency.getCurrenciesWithRates());

    /**
     * Form initialisation, along with wiring up recalculation on form update
    **/
    this.calculatorForm = this._fb.nonNullable.group({
      currency: this._fb.nonNullable.control(getDefaultCurrency()),
      autoConversion: this._fb.nonNullable.control(false),

      principal: this._fb.nonNullable.control(10000, Validators.compose([
        Validators.required,
        Validators.min(0)
      ])),
      annualRate: this._fb.nonNullable.control(16, Validators.compose([
        Validators.required,
        Validators.min(0)
      ])),

      monthlyDeposit: this._fb.nonNullable.control(0, [
        Validators.required,
        Validators.min(0)
      ]),
      noFirstMonthDeposit: this._fb.nonNullable.control(true),

      taxRate: this._fb.nonNullable.control(23, Validators.min(0)),
      taxTiming: this._fb.nonNullable.control(TaxTiming.AtMaturity),

      duration: this._fb.nonNullable.group({
        value: this._fb.nonNullable.control(this.duration().duration(), [
          Validators.required,
          Validators.min(3)
        ]),
        scale: this._fb.nonNullable.control(this.duration().scale()),
      }),

      accrualFrequency: this._fb.nonNullable.control(4),
      capitalization: this._fb.nonNullable.control(false),
    });

    this.calculatorForm.controls.currency.valueChanges
    .subscribe(currency => {
      if (this.calculatorForm.controls.autoConversion.value) {
        const principal = this._currencyConversion.convert(
          this._deposit().principal(),
          this._deposit().currency().code,
          currency.code,
          CurrencyConvertSide.Equal,
        );

        const monthlyDeposit = this._currencyConversion.convert(
          this._deposit().monthlyDeposit(),
          this._deposit().currency().code,
          currency.code,
          CurrencyConvertSide.Equal,
        );

        this._deposit.update(
          deposit => deposit.setInput(
            principal,
            monthlyDeposit
          ).setCurrency(currency)
        );

        this.calculatorForm.patchValue({
          principal,
          monthlyDeposit,
        });
      } else {
        this._deposit.update(deposit => deposit.setCurrency(currency))
      }
    });

    this.calculatorForm.controls.duration.valueChanges.subscribe(group => {
      this.duration.update(
        duration => duration.update(group.value!, group.scale!)
      );

      this.calculatorForm.controls.duration.controls.value.setValue(
        this.duration().duration(),
        { emitEvent: false, emitModelToViewChange: true },
      )
    });

    this.calculatorForm.valueChanges.subscribe(() => {
      this.formChanged.set(true);
    });

    this.calculatorForm.valueChanges.pipe(debounceTime(500)).subscribe(() =>  {
      this._deposit.update(
        deposit => deposit.setAutoconversion(
          this.calculatorForm.controls.autoConversion.value
        )
      );

      this._recalculateResult();
      this.formChanged.set(false);
    });


    /**
     * Pull up the correct deposit from deposit store to work with
    **/
    inject(ActivatedRoute).data.pipe(
      filter(x => Boolean(x?.['calculator'])),
      take(1),
      map(x => x['calculator'] as DepositModel)
    ).subscribe(data => {
      this._deposit.set(data);
      this.duration.set(data.input().duration);

      const input = data.input();

      const depositCurrencyCode = data.currency().code;

      const mappedAccrualFrequencyIndex = this.accrualFrequencies.findIndex(
        x => x.value === input.accrualFrequency
      )!;

      this.calculatorForm.patchValue({
        currency: this.currencies().find(
          currency => currency.code === depositCurrencyCode
        )!,
        autoConversion: data.autoConversion(),

        principal: input.principal,
        annualRate: input.annualRate * 100,
        monthlyDeposit: input.monthlyDeposit,
        taxRate: input.taxRate * 100,
        taxTiming: input.isTaxed() ? TaxTiming.AtMaturity : TaxTiming.None,
        noFirstMonthDeposit: input.noStartDeposits === 1,
        accrualFrequency: mappedAccrualFrequencyIndex,
        capitalization: input.capitalize,
        duration: {
          value: input.duration.duration(),
          scale: input.duration.scale(),
        },
      }, { emitEvent: true });
    });
  }

  public save() {
    this._depositBridge.updateDeposit(this.deposit());
  }



  private _recalculateResult() {
    const {
      principal,
      annualRate,
      monthlyDeposit,
      accrualFrequency,
      capitalization,
      taxRate,
      taxTiming,
      noFirstMonthDeposit,
    } = this.calculatorForm.getRawValue();

    const annualRateValue       = annualRate;
    const accrualFrequencyValue = this.accrualFrequencies[accrualFrequency].value;
    const duration              = this.duration();
    const principalValue        = principal;

    let depositInput: DepositInput | null = null;

    try {
      depositInput = createDepositInput(
        principalValue,
        annualRateValue,
        duration,
        monthlyDeposit,

        accrualFrequencyValue,
        capitalization,

        taxRate,
        taxTiming && TaxTiming.AtMaturity || TaxTiming.None,

        +noFirstMonthDeposit,
        0,
      );
    } catch (e) {
      this._logger.e((e as Error).message);

      return;
    }

    const depositResult = calculateDeposit(depositInput);

    this._deposit.set(
      new DepositModel(
        this._deposit().name(),
        this._deposit().currency(),
        this._deposit().autoConversion(),
        depositInput,
        depositResult
      )
    );
  }
}
