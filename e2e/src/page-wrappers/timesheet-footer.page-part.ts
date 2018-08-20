import { by, ElementFinder } from 'protractor';
import { ScalarPagePartBase } from './base-classes/scalar-page-part-base';
import { GrandTotalPagePart } from './grand-total.page-part';

export class TimeSheetFooterPagePart extends ScalarPagePartBase {
  constructor(
    _element: ElementFinder,
  ) {
    super(_element);
  }

  get grandTotal(): GrandTotalPagePart {
    return new GrandTotalPagePart(this._element.element(by.css('.timesheet-footer__grand-total-cell')));
  }
}
