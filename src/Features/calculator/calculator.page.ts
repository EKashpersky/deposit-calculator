import { Component } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";



@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.page.html',

  imports: [ MatFormFieldModule, MatInputModule ]
})
export class CalculatorPage {
  public constructor() {

  }
}
