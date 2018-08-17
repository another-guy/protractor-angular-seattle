import { Timesheet } from './models/timesheet';

export const FAKE_TIMESHEET: Timesheet = {
  weekList: [
    {
      dayList: [
        { hours: 0, earningCode: 'N/A' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 0, earningCode: 'N/A' },
      ],
    },
    {
      dayList: [
        { hours: 0, earningCode: 'N/A' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'SCK' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 0, earningCode: 'N/A' },
      ],
    },
    {
      dayList: [
        { hours: 0, earningCode: 'N/A' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 0, earningCode: 'N/A' },
      ],
    },
    {
      dayList: [
        { hours: 0, earningCode: 'N/A' },
        { hours: 8, earningCode: 'VAC' },
        { hours: 6, earningCode: 'VAC' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 8, earningCode: 'REG' },
        { hours: 0, earningCode: 'N/A' },
      ],
    }
  ],
};
