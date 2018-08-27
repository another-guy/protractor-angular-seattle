import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TimesheetFooterLineComponent } from './timesheet-footer-line/timesheet-footer-line.component';
import { TimesheetHeaderLineComponent } from './timesheet-header-line/timesheet-header-line.component';
import { TimesheetWeekDayComponent } from './timesheet-week-day/timesheet-week-day.component';
import { TimesheetWeekLineComponent } from './timesheet-week-line/timesheet-week-line.component';
import { ResourceLoader } from '@angular/compiler';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetWeekLineComponent,
    TimesheetHeaderLineComponent,
    TimesheetFooterLineComponent,
    TimesheetWeekDayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    { provide: ResourceLoader, useValue: null },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
