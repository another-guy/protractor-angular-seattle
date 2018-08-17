import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TimesheetHoursCounter } from '../timesheet-hours-counter';
import { Timesheet } from '../models/timesheet';

@Component({
  selector: 'timesheet-footer-line',
  templateUrl: './timesheet-footer-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetFooterLineComponent {

  dayIndices = [ 0, 1, 2, 3, 4, 5, 6];

  @Input() value: Timesheet = null;

  get grandTotal(): number {
    return new TimesheetHoursCounter().totalsForPayPeriod(this.value);
  }
}
