import { ElementFinder } from 'protractor';

export class InputText {
  static async getText(element: ElementFinder): Promise<string> {
    return await element.getAttribute('value');
  }

  static async setText(element: ElementFinder, text: string): Promise<void> {
    await element.clear();
    await element.sendKeys(text);
  }
}
