import { ElementArrayFinder } from 'protractor';
import { TimeSheetWeekLinePagePart } from './timesheet-week-line.page-part';

export class TimeSheetWeekLineListPagePart {
  constructor(
    private _elementList: ElementArrayFinder,
  ) {
  }

  async count(): Promise<number> {
    return await this._elementList.count();
  }

  get(weekLineIndex: number): TimeSheetWeekLinePagePart {
    return new TimeSheetWeekLinePagePart(this._elementList.get(weekLineIndex));
  }

  async map<T>(mapFn: (weekDay?: TimeSheetWeekLinePagePart, index?: number) => T | any) {
    return await this._elementList.map<TimeSheetWeekLinePagePart>((element, index) => mapFn(new TimeSheetWeekLinePagePart(element), index));
  }

}
