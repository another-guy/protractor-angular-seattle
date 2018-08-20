import { by, ElementFinder } from 'protractor';
import { InputText } from './dom-accessors/input-text';

export class WeekDayPagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  private get hoursInput(): ElementFinder {
    return this._element.element(by.css('.week-day__hours'));
  }

  private get earningCodeInput(): ElementFinder {
    return this._element.element(by.css('.week-day__earning-code'));
  }

  getHours(): Promise<string> {
    return InputText.getText(this.hoursInput);
  }

  getEarningCode(): Promise<string> {
    return InputText.getText(this.earningCodeInput);
  }

  setHours(text: string): Promise<void> {
    return InputText.setText(this.hoursInput, text);
  }

  setEarningCode(text: string): Promise<void> {
    return InputText.setText(this.earningCodeInput, text);
  }
}
