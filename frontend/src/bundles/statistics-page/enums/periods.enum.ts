import { StatisticsPeriods } from 'shared/build';

const StatisticsPeriodsLabels = {
    WEEKLY: {
        label: 'WEEKLY VIEWS',
        value: StatisticsPeriods.WEEKLY,
    },
    MONTHLY: {
        label: 'MONTHLY VIEWS',
        value: StatisticsPeriods.MONTHLY,
    },
    TOTAL: {
        label: 'TOTAL VIEWS',
        value: StatisticsPeriods.TOTAL,
    },
} as const;

export { StatisticsPeriodsLabels };
