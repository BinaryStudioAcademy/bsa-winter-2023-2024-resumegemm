import { type StatisticsRecord } from './statistics-record.dto';

type StatisticsResponseDto = {
    data: StatisticsRecord[];
    sum: number;
};

export { type StatisticsResponseDto };
