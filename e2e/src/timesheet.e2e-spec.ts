import { by } from 'protractor';
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

      await Promise.all(
        [0, 1, 2, 3]
          .map(async (weekIndex) => {
            const weekElement = timeSheetPage.weekLines.get(weekIndex);
            expect(await weekElement.isDisplayed()).toBeTruthy();

            const weekDayList = weekElement.all(by.css('.week-day'));
            expect(await weekDayList.isDisplayed()).toBeTruthy();

            const displayedHoursAndCodes = <{ hours: number, code: string }[]>
              await weekDayList
                .map(async weekDayElement => {
                  const hours = +(await weekDayElement.element(by.css('.week-day__hours')).getAttribute('value'));
                  const code = await weekDayElement.element(by.css('.week-day__earning-code')).getAttribute('value');
                  return { hours, code };
                });

            const displayedHoursSum = +(await weekElement.element(by.css('.timesheet-line__week-total-cell')).getText());

            const expectedHoursSum = displayedHoursAndCodes
              .reduce(
                (subTotal, hourAndCode) =>
                  subTotal + ((hourAndCode.code || '').toUpperCase() === 'REG' ? hourAndCode.hours : 0),
                0
              );
            expectedGrandTotal += expectedHoursSum;

            expect(displayedHoursSum).toBe(expectedHoursSum);
          })
      );

      const displayedGrandTotal = +(await timeSheetPage.timeSheet.element(by.css('.timesheet-footer__grand-total-cell')).getText());
      expect(displayedGrandTotal).toBe(expectedGrandTotal);
    })
  );
});
