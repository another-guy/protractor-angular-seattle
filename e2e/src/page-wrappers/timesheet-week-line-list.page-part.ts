import { ElementArrayFinder } from 'protractor';
import { ListPagePartBase } from './base-classes/list-page-part-base';
import { TimeSheetWeekLinePagePart } from './timesheet-week-line.page-part';

export class TimeSheetWeekLineListPagePart extends ListPagePartBase<TimeSheetWeekLinePagePart> {
  constructor(
    _elementList: ElementArrayFinder,
  ) {
    super(elemendFinder => new TimeSheetWeekLinePagePart(elemendFinder), _elementList);
  }
}
