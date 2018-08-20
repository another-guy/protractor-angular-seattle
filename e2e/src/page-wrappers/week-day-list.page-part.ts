import { ElementArrayFinder, ElementFinder } from 'protractor';
import { WeekDayPagePart } from './week-day.page-part';

export class WeekDayListPagePart {
  constructor(
    private _elementList: ElementArrayFinder,
  ) {
  }

  async count(): Promise<number> {
    return await this._elementList.count();
  }

  async map<T>(mapFn: (weekDay?: WeekDayPagePart, index?: number) => T | any): Promise<T[]> {
    return await this._elementList.map<T>((element, index) => mapFn(new WeekDayPagePart(element), index));
  }
}
