import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  imports: [RouterLink],
})
export class HomePage {
  public pageName = signal('Home page!');

  public constructor() {}
}
