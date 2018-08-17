import { Component } from '@angular/core';
import { FAKE_TIMESHEET } from './fake-timesheet';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'protractor-angular-seattle';

  timesheet = FAKE_TIMESHEET;
}
