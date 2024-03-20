import { type StatisticsRecord } from './statistics-record.dto';

type StatisticsResponseDto = {
    data: StatisticsRecord[];
    viewsOverPeriod: number;
};

export { type StatisticsResponseDto };
