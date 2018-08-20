import { by, ElementFinder } from 'protractor';
import { WeekDayListPagePart } from './week-day-list.page-part';

export class TimeSheetWeekLinePagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  async isDisplayed(): Promise<boolean> {
    return await this._element.isDisplayed();
  }

  get dayList(): WeekDayListPagePart {
    return new WeekDayListPagePart(this._element.all(by.css('.week-day')));
  }

  get totalCell(): ElementFinder {
    return this._element.element(by.css('.timesheet-line__week-total-cell'));
  }
}
