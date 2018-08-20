import { Component } from '@angular/core';
import { BLANK_TIMESHEET } from './blank-timesheet';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protractor-angular-seattle';

  timesheet = BLANK_TIMESHEET;
}
