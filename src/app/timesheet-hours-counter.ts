import { Timesheet, TimesheetWeekLine } from './models/timesheet';

export class TimesheetHoursCounter {

  totalsForWeek(week: TimesheetWeekLine): number {
    return week
      .dayList
      .reduce((subTotal, day) => subTotal + (this.isSummable(day.earningCode) ? +day.hours : 0), 0);
  }

  totalsForPayPeriod(timesheet: Timesheet): number {
    return timesheet
      .weekList
      .reduce((subTotal, week) => subTotal + this.totalsForWeek(week), 0);
  }

  private isSummable(earningCode: string): boolean {
    return (earningCode || '').toUpperCase() === 'REG';
  }

}