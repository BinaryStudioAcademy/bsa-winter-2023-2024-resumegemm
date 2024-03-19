import { type StatisticsRecord } from 'shared/build';

function calculateVotesSum(records: StatisticsRecord[]): number {
    let sum = 0;
    for (const record of records) {
        sum += record[1];
    }
    return sum;
}

export { calculateVotesSum };
