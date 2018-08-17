import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TimesheetDay } from '../models/timesheet';

@Component({
  selector: 'timesheet-week-day',
  templateUrl: './timesheet-week-day.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetWeekDayComponent {

  @Input() value: TimesheetDay = null;

}
