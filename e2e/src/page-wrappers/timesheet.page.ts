import { browser, by, element, ElementFinder } from 'protractor';
import { TimeSheetFooterPagePart } from './timesheet-footer.page-part';
import { TimeSheetHeaderPagePart } from './timesheet-header.page-part';
import { TimeSheetWeekLineListPagePart } from './timesheet-week-line-list.page-part';

export class TimeSheetPage {

  async navigateTo(): Promise<void> {
    await browser.get('/');
  }

  async isDisplayed(): Promise<boolean> {
    return await this.timeSheet.isDisplayed();
  }

  private get timeSheet(): ElementFinder {
    return element(by.css('.timesheet'));
  }

  get header(): TimeSheetHeaderPagePart {
    return new TimeSheetHeaderPagePart(this.timeSheet.element(by.css('.timesheet-header')));
  }

  get footer(): TimeSheetFooterPagePart {
    return new TimeSheetFooterPagePart(this.timeSheet.element(by.css('.timesheet-footer')));
  }

  get weekLines(): TimeSheetWeekLineListPagePart {
    return new TimeSheetWeekLineListPagePart(this.timeSheet.all(by.css('.timesheet-line')));
  }
}
