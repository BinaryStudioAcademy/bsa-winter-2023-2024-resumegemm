import { Chart } from 'react-google-charts';

import { ColumnChartColor } from '../../enums/enums';

type Properties = {
    color?: ColumnChartColor;
    measure: string;
    data: [string, number][];
};

const ColumnChart: React.FC<Properties> = ({
    color = ColumnChartColor.DarkBlue,
    measure,
    data,
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
            chartType="ColumnChart"
            data={[['', measure], ...data]}
            options={options}
        />
    );
};

export { ColumnChart };
