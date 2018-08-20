import { browser, by, element, ElementFinder } from 'protractor';
import { ScalarPagePartBase } from './base-classes/scalar-page-part-base';
import { TimeSheetFooterPagePart } from './timesheet-footer.page-part';
import { TimeSheetHeaderPagePart } from './timesheet-header.page-part';
import { TimeSheetWeekLineListPagePart } from './timesheet-week-line-list.page-part';

export class TimeSheetPage extends ScalarPagePartBase {

  constructor() {
    super(element(by.css('.timesheet')));
  }

  async navigateTo(): Promise<void> {
    await browser.get('/');
  }

  private get timeSheet(): ElementFinder {
    return this._element;
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
