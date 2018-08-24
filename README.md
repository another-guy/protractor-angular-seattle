# ProtractorAngularSeattle

## Code Evolituion

```sh
$ git tag --list

0-scaffolded-project
1-repair-the-only-test
2-add-delay-before-exiting-test
3-add-simple-timesheet-table-with-totals
4-add-BEM-CSS-classes
5-straightforward-timesheet-table-tests
6-few-page-part-objects
7-timesheet-test-clean-of-css-selectors
8-refactor-page-object-and-page-parts
9-rewrite-timesheet-test-for-dynamism
a-refactor-to-reduce-code-duplication
```

## Development server

Run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## The core idea

The code of the end-to-end tests should be written with [business level concepts](https://slides.com/igorsoloydenko/pragmatic-protractor#/16).

All the DOM-related machinery that is used by the test should be hidden inside [`PageObjects`/`ComponentObjects`](https://slides.com/igorsoloydenko/pragmatic-protractor#/15).

```ts
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
```
