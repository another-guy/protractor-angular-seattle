import { ElementArrayFinder } from 'protractor';
import { ListPagePartBase } from './base-classes/list-page-part-base';
import { WeekDayPagePart } from './week-day.page-part';

export class WeekDayListPagePart extends ListPagePartBase<WeekDayPagePart> {
  constructor(
    _elementList: ElementArrayFinder,
  ) {
    super(elemendFinder => new WeekDayPagePart(elemendFinder), _elementList);
  }
}
