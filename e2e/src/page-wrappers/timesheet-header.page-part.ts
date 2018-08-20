import { ElementFinder } from 'protractor';
import { ScalarPagePartBase } from './base-classes/scalar-page-part-base';

export class TimeSheetHeaderPagePart extends ScalarPagePartBase {
  constructor(
    _element: ElementFinder,
  ) {
    super(_element);
  }
}
