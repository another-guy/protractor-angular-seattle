import { ElementFinder } from 'protractor';

export class ScalarPagePartBase {
  constructor(
    protected _element: ElementFinder,
  ) {
  }

  async isDisplayed(): Promise<boolean> {
    return await this._element.isDisplayed();
  }
}
