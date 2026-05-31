import {
  CurrencyPipe,
  getLocaleCurrencyCode,
  getLocaleCurrencySymbol,
  PercentPipe
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import {
  FormBuilder,
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
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { debounceTime, filter, map, take } from 'rxjs';

import { DepositSummaryComponent } from '@features/deposit-summary';
import { DepositBridgeService } from '@shared/deposits';

import {
  calculateDeposit,
  createDepositInput,
} from './calculator.model';
import {
  CompoundRate,
  DepositInput,
  DepositModel,
  DepositResult,
  Duration,
} from './model';



@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.page.html',
  styleUrl: 'calculator.page.scss',
  host: {
    class: 'flex flex-row gap-[32px]'
  },

  imports: [
    ReactiveFormsModule,

    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    TranslatePipe,
    MatProgressBarModule,
    MatDividerModule,

    DepositSummaryComponent,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage {
  public readonly calculatorForm: FormGroup;
  public readonly currency: string;
  public readonly currencySign: string;
  public readonly compoundRates: { value: number, label: string }[];

  public readonly duration = signal(new Duration('months', 24));


  public formChanged = signal(false);

  private _depositName: string;
  private _depositInput: DepositInput;
  private _depositResult: DepositResult;



  private _deposit = signal<DepositModel>(DepositModel.Empty());
  public readonly deposit = this._deposit.asReadonly();



  public constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private _depositBridge: DepositBridgeService,
  ) {
    /**
     * All the boring stuff
    **/
    this._depositName = '';
    this._depositInput  = DepositInput.Empty();
    this._depositResult = DepositResult.Empty();

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


    /**
     * Form initialisation, along with wiring up recalculation on form update
    **/
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

    this.calculatorForm.valueChanges.subscribe(() => {
      this.formChanged.set(true);
    });

    this.calculatorForm.valueChanges.pipe(debounceTime(500)).subscribe(() =>  {
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
      this._depositName = data.name();

      this.duration.set(data.input().duration);

      const input = data.input();

      const mappedCompoundIndex = this.compoundRates.findIndex(
        x => x.value === input.compoundRate
      )!;

      this.calculatorForm.patchValue({
        principal: input.principal,
        annualRate: input.annualRate,
        monthlyDeposit: input.monthlyDeposit,
        tax: input.tax,
        withTaxes: input.isTaxed(),
        noFirstMonthDeposit: input.isNoFirstMonthDeposit(),
        compoundRate: mappedCompoundIndex,
        duration: {
          value: input.duration.duration(),
          scale: input.duration.scale(),
        },
      }, { emitEvent: true });
    });
  }

  public save() {
    this._depositBridge.updateDeposit(
      new DepositModel(
        this._depositName,
        this._depositInput,
        this._depositResult
      )
    );
  }



  private _recalculateResult() {
    const {
      principal,
      annualRate,
      monthlyDeposit,
      tax,
      compoundRate,
      withTaxes,
      noFirstMonthDeposit,
    } = this.calculatorForm.value;

    const annualRateValue   = parseFloat(annualRate);
    const compoundRateValue = this.compoundRates[parseInt(compoundRate)].value;
    const duration          = this.duration();
    const taxValue          = parseFloat(tax);
    const principalValue    = parseInt(principal);
    if (principalValue <= 0 || annualRateValue <= 0 || duration.duration() <= 0) {
      // this._deposit.set(DepositModel.Empty());
      return;
    }

    this._depositInput = createDepositInput(
      principalValue,
      annualRateValue,
      duration,
      parseInt(monthlyDeposit),
      taxValue,
      compoundRateValue,
      noFirstMonthDeposit,
      withTaxes,
    );

    this._depositResult = calculateDeposit(this._depositInput);

    this._deposit.set(
      new DepositModel(
        this._depositName,
        this._depositInput,
        this._depositResult
      )
    );
  }
}
