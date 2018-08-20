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

  describe('Week Totals', () => {
    it('should be calculated properly for empty timesheet', async () => {
      await timeSheetPage.weekLines.forEach(async weekDay =>
        expect(await weekDay.totalCell.getText()).toBe('0')
      );

      expect(await timeSheetPage.footer.grandTotal.getText()).toBe('0');
    });

    it('should be calculated properly for non-empty timesheet', async () => {
      await fillInTimeSheet(
        [
          [ { h: '0', c: 'reg' }, { h: '1', c: 'reg' }, { h: '2', c: 'reg' }, { h: '3', c: 'reg' }, { h: '4', c: 'reg' }, { h: '5', c: 'reg' }, { h: '0', c: 'reg' } ],
          [ { h: '0', c: 'vac' }, { h: '1', c: 'vac' }, { h: '2', c: 'vac' }, { h: '3', c: 'vac' }, { h: '4', c: 'vac' }, { h: '5', c: 'vac' }, { h: '0', c: 'vac' } ],
          [ { h: '8', c: 'reg' }, { h: '0', c: 'reg' }, { h: '0', c: 'reg' }, { h: '0', c: 'reg' }, { h: '0', c: 'reg' }, { h: '0', c: 'reg' }, { h: '8', c: 'reg' } ],
          [ { h: '8', c: 'vac' }, { h: '0', c: 'vac' }, { h: '0', c: 'vac' }, { h: '0', c: 'vac' }, { h: '0', c: 'vac' }, { h: '0', c: 'vac' }, { h: '8', c: 'vac' } ],
        ]
      );

      expect(await timeSheetPage.weekLines.get(0).totalCell.getText()).toBe('15');
      expect(await timeSheetPage.weekLines.get(1).totalCell.getText()).toBe('0');
      expect(await timeSheetPage.weekLines.get(2).totalCell.getText()).toBe('16');
      expect(await timeSheetPage.weekLines.get(3).totalCell.getText()).toBe('0');
      expect(await timeSheetPage.footer.grandTotal.getText()).toBe('31');
    });
  });
});

function fillInTimeSheet(data: { c: string, h: string }[][]): Promise<void[]> {
  return Promise.all(
    data.map(async (weekData, weekIndex) => {
      const weekLine = timeSheetPage.weekLines.get(weekIndex);
      await Promise.all(
        weekData.map(async (weekDayData, dayIndex) => {
          const weekDay = weekLine.dayList.get(dayIndex);
          await weekDay.setHours(weekDayData.h);
          await weekDay.setEarningCode(weekDayData.c);
        })
      );
    })
  );
}
