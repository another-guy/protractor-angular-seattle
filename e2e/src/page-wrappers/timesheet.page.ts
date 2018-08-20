import { browser, by, element, ElementFinder } from 'protractor';
import { TimeSheetFooterPagePart } from './timesheet-footer.page-part';
import { TimeSheetHeaderPagePart } from './timesheet-header.page-part';
import { TimeSheetWeekLinesPagePart } from './timesheet-week-lines.page-part';

export class TimeSheetPage {

  async navigateTo(): Promise<void> {
    await browser.get('/');
  }

  async isDisplayed(): Promise<boolean> {
    return await this.timeSheet.isDisplayed();
  }

  // TODO make private -- leaked abstraction
  get timeSheet(): ElementFinder {
    return element(by.css('.timesheet'));
  }

  get header(): TimeSheetHeaderPagePart {
    return new TimeSheetHeaderPagePart(this.timeSheet.element(by.css('.timesheet-header')));
  }

  get footer(): TimeSheetFooterPagePart {
    return new TimeSheetFooterPagePart(this.timeSheet.element(by.css('.timesheet-footer')));
  }

  get weekLines(): TimeSheetWeekLinesPagePart {
    return new TimeSheetWeekLinesPagePart(this.timeSheet.all(by.css('.timesheet-line')));
  }
}
