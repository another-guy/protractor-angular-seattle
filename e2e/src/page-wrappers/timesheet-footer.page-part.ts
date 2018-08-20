import { ElementFinder } from 'protractor';

export class TimeSheetFooterPagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  async isDisplayed(): Promise<boolean> {
    return this._element.isDisplayed();
  }
}
