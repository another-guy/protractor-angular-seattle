import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TimesheetWeekLine } from '../models/timesheet';
import { TimesheetHoursCounter } from '../timesheet-hours-counter';

@Component({
  selector: 'timesheet-week-line',
  templateUrl: './timesheet-week-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetWeekLineComponent {

  @Input() weekIndex: number = null;
  @Input() value: TimesheetWeekLine = null;

  get weekTotal(): number {
    return new TimesheetHoursCounter().totalsForWeek(this.value);
  }

}
