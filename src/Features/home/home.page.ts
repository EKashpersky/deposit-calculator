import { Component, signal } from '@angular/core';



@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
})
export class HomePage {
  public pageName = signal('Home page!');

  public constructor() {}
}
