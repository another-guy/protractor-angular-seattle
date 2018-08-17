import { browser } from 'protractor';

export class Test {

  async delayTestByMilliseconds(interval: number = 500): Promise<any> {
    return await browser.driver.sleep(interval);
  }

}
