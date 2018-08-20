import { by, ElementFinder } from 'protractor';
import { GrandTotalPagePart } from './grand-total.page-part';

export class TimeSheetFooterPagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  async isDisplayed(): Promise<boolean> {
    return this._element.isDisplayed();
  }

  get grandTotal(): GrandTotalPagePart {
    return new GrandTotalPagePart(this._element.element(by.css('.timesheet-footer__grand-total-cell')));
  }
}
