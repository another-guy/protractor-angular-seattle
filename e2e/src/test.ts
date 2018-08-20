import { browser } from 'protractor';

export class Test {

  async commonAfterEachTest(): Promise<void> {
    // TODO check browser console does not have any Error level messages

    // TODO take screenshot

    await this.delayTestByMilliseconds(2000);
  }

  async delayTestByMilliseconds(interval: number = 500): Promise<any> {
    return await browser.driver.sleep(interval);
  }

}
