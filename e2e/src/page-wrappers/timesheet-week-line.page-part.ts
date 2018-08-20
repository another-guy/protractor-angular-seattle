import { by, ElementFinder } from 'protractor';
import { WeekDayListPagePart } from './week-day-list.page-part';
import { ScalarPagePartBase } from './base-classes/scalar-page-part-base';

export class TimeSheetWeekLinePagePart extends ScalarPagePartBase {
  constructor(
    _element: ElementFinder,
  ) {
    super(_element);
  }

  get dayList(): WeekDayListPagePart {
    return new WeekDayListPagePart(this._element.all(by.css('.week-day')));
  }

  get totalCell(): ElementFinder {
    return this._element.element(by.css('.timesheet-line__week-total-cell'));
  }
}
