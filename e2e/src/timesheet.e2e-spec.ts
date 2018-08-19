import { browser, by, element } from 'protractor';
import { Test } from './test';

const test = new Test();

describe('Timesheet', () => {
  describe('Main UI elements', () => {
    it('should be displayed', async () => {
      await browser.get('/');

      const timeSheet = element(by.css('.timesheet'));
      expect(await timeSheet.isDisplayed()).toBeTruthy();

      const timeSheetHeader = timeSheet.element(by.css('.timesheet-header'));
      expect(await timeSheetHeader.isDisplayed()).toBeTruthy();

      const timeSheetFooter = timeSheet.element(by.css('.timesheet-footer'));
      expect(await timeSheetFooter.isDisplayed()).toBeTruthy();

      const timeSheetLineList = timeSheet.all(by.css('.timesheet-line'));
      expect(await timeSheetLineList.count()).toBe(4);

      await test.delayTestByMilliseconds(5000);
    });
  });

  describe('Week Totals', () =>
    it('should be calculated properly', async () => {
      await browser.get('/');

      const timeSheet = element(by.css('.timesheet'));
      expect(await timeSheet.isDisplayed()).toBeTruthy();

      const timeSheetLineList = timeSheet.all(by.css('.timesheet-line'));
      expect(await timeSheetLineList.count()).toBe(4);

      let expectedGrandTotal = 0;

      await Promise.all(
        [0, 1, 2, 3]
          .map(async (weekIndex) => {
            const weekElement = timeSheetLineList.get(weekIndex);
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

      const displayedGrandTotal = +(await timeSheet.element(by.css('.timesheet-footer__grand-total-cell')).getText());
      expect(displayedGrandTotal).toBe(expectedGrandTotal);

      await test.delayTestByMilliseconds(5000);
    })
  );
});
