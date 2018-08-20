import { ElementFinder, by, protractor } from 'protractor';

export class WeekDayPagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  // TODO Repetetive code again...
  async getHours(): Promise<string> {
    return await this._element.element(by.css('.week-day__hours')).getAttribute('value');
  }

  async getEarningCode(): Promise<string> {
    return await this._element.element(by.css('.week-day__earning-code')).getAttribute('value');
  }

  async setHours(text: string): Promise<void> {
    await this._element.element(by.css('.week-day__hours')).sendKeys(text);
    await this._element.element(by.css('.week-day__hours')).sendKeys(protractor.Key.TAB);
  }

  async setEarningCode(text: string): Promise<void> {
    await this._element.element(by.css('.week-day__earning-code')).sendKeys(text);
    await this._element.element(by.css('.week-day__earning-code')).sendKeys(protractor.Key.TAB);
  }
}
