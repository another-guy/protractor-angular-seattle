import { ElementFinder } from 'protractor';

export class GrandTotalPagePart {
  constructor(
    private _element: ElementFinder,
  ) {
  }

  async getText(): Promise<string> {
    return await this._element.getText();
  }
}
