import { ElementArrayFinder, ElementFinder } from 'protractor';

export class TimeSheetWeekLinesPagePart {
  constructor(
    private _elementList: ElementArrayFinder,
  ) {
  }

  async count(): Promise<number> {
    return await this._elementList.count();
  }

  // TODO make private -- leaked abstraction
  get(weekLineIndex: number): ElementFinder {
    return this._elementList.get(weekLineIndex);
  }

}
