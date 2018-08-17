import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'timesheet-header-line',
  templateUrl: './timesheet-header-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetHeaderLineComponent {

  dayIndices = [ 0, 1, 2, 3, 4, 5, 6];

  dayNameFrom(dayIndex: number): string {
    switch (dayIndex) {
      case 0: return 'Sun';
      case 1: return 'Mon';
      case 2: return 'Tue';
      case 3: return 'Wed';
      case 4: return 'Thu';
      case 5: return 'Fri';
      case 6: return 'Sat';
      default: return '';
    }
  }

}
