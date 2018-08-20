import { TimeSheetPage } from './page-wrappers/timesheet.page';
import { Test } from './test';

const timeSheetPage = new TimeSheetPage();
const test = new Test();

describe('Timesheet', () => {

  beforeEach(async () => {
    await timeSheetPage.navigateTo();
  });

  afterEach(async () => {
    await test.commonAfterEachTest();
  });

  describe('Main UI elements', () => {
    it('should be displayed', async () => {
      expect(await timeSheetPage.isDisplayed()).toBeTruthy();
      expect(await timeSheetPage.header.isDisplayed()).toBeTruthy();
      expect(await timeSheetPage.footer.isDisplayed()).toBeTruthy();
      expect(await timeSheetPage.weekLines.count()).toBe(4);
    });
  });

  describe('Week Totals', () =>
    it('should be calculated properly', async () => {

      let expectedGrandTotal = 0;

      await timeSheetPage.weekLines.map(async weekLine => {
        expect(await weekLine.isDisplayed()).toBeTruthy();

        const displayedHoursAndCodes =
          await weekLine.dayList.map<{ hours: number, code: string }>(async weekDay => {
            const hours = +(await weekDay.getHours());
            const code = await weekDay.getEarningCode();
            return { hours, code };
          });

        const displayedHoursSum = +(await weekLine.totalCell.getText());

        const expectedHoursSum = displayedHoursAndCodes
          .reduce(
            (subTotal, hourAndCode) =>
              subTotal + ((hourAndCode.code || '').toUpperCase() === 'REG' ? hourAndCode.hours : 0),
            0
          );
        expectedGrandTotal += expectedHoursSum;

        expect(displayedHoursSum).toBe(expectedHoursSum);
      });

      expect(+(await timeSheetPage.footer.grandTotal.getText())).toBe(expectedGrandTotal);
    })
  );
});
