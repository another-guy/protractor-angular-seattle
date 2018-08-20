import { ElementFinder, by } from 'protractor';

export class WeekDayPagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  async getHours(): Promise<string> {
    return await this._element.element(by.css('.week-day__hours')).getAttribute('value');
  }

  async getEarningCode(): Promise<string> {
    return await this._element.element(by.css('.week-day__earning-code')).getAttribute('value');
  }
}
