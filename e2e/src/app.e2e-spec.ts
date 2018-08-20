import { AppPage } from './app.po';
import { Test } from './test';

const test = new Test();

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    await test.commonAfterEachTest();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toEqual('Welcome to protractor-angular-seattle!');
  });
});
