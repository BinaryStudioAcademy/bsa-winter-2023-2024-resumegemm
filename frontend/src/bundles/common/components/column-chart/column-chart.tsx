import { Chart } from 'react-google-charts';
import { type StatisticsRecord } from 'shared/build';

type Properties = {
    color?: string;
    measure: string;
    data: StatisticsRecord[];
    className?: string;
};

const ColumnChart: React.FC<Properties> = ({
    color = getComputedStyle(document.documentElement).getPropertyValue(
        '--color-background-dark-blue',
    ),
    measure,
    data,
    className,
}: Properties) => {
    const options = {
        vAxis: {
            gridlines: {
                color: 'transparent',
            },
            baselineColor: {
                color: 'transparent',
            },
            textPosition: 'none',
        },
        legend: 'none',
        colors: [color],
    };

    return (
        <Chart
            className={className}
            chartType="ColumnChart"
            data={[['', measure], ...data]}
            options={options}
        />
    );
};

export { ColumnChart };
