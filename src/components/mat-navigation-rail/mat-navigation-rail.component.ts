import { Component, input, output, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'mat-navigation-rail',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './mat-navigation-rail.component.html',
  styleUrls: ['./mat-navigation-rail.component.scss'],
})
export class MatNavigationRailComponent {
  @ViewChild('innerSidenav') private innerSidenav!: MatSidenav;

  public expanded = input<boolean>(true);
  public expandedChange = output<boolean>();

  toggle() {
    const newValue = !this.expanded();
    this.expandedChange.emit(newValue);
  }
}