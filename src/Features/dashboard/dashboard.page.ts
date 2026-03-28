import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

import { DepositInput } from '../calculator/calculator.model';




@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    RouterLink,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,

    TranslatePipe
  ],
})
export class DashboardPage {
  public pageName = signal('Dashboard page!');

  public deposits = signal<DepositInput[]>([]);

  public constructor() {}


}
