export interface Timesheet {
  weekList: TimesheetWeekLine[];
}

export interface TimesheetWeekLine {
  dayList: TimesheetDay[];
}

export interface TimesheetDay {
  hours: number;
  earningCode: string;
}
