import { useCallback, useState } from 'react';

import templateThirdImage from '~/assets/img/5297769.png';
import {
    ColumnChart,
    Dropdown,
    Header,
    NavTabs,
} from '~/bundles/common/components/components';
import { UserProfile } from '~/bundles/common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { StatisticsPeriods } from '~/bundles/common/enums/enums';

import { StatisticResumeCard } from '../components/resume-card/resume-card';
import styles from './styles.module.scss';

const ColumnChartData: [string, number][] = [
    ['Monday', 23],
    ['Tuesday', 34],
    ['Wednesday', 5],
    ['Thursday', 70],
    ['Friday', 100],
    ['Saturday', 110],
    ['Sunday', 160],
];

const headerItems = [
    { label: 'Home', path: AppRoute.ROOT },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

const dropdownOptions = [
    StatisticsPeriods.WEEKLY,
    StatisticsPeriods.MONTHLY,
    StatisticsPeriods.TOTAL,
];

const StatisticsPage = (): JSX.Element => {
    const [viewsPeriod, setViewsPeriod] = useState<string>(
        StatisticsPeriods.WEEKLY.value,
    );

    const [views, setViews] = useState(0);

    const handleDropdownChange = useCallback((value: string | undefined) => {
        if (!value) {
            return;
        }

        setViewsPeriod(value);
    }, []);

    const handleTitle = useCallback((value: string | undefined) => {
        return dropdownOptions.find((period) => period.value === value)?.label;
    }, []);

    return (
        <>
            <Header>
                <NavTabs items={headerItems}></NavTabs>
                <UserProfile image="https://avatars.githubusercontent.com/u/810438?v=4" />
            </Header>

            <div className={styles.statistics__container}>
                <section className={styles.statistics__view_container}>
                    <div className={styles.statistics__title_container}>
                        <h2>{handleTitle(viewsPeriod)}</h2>
                        <Dropdown
                            name="language"
                            className={styles.statistics__dropdown}
                            options={dropdownOptions}
                            placeholder="Select range"
                            onChange={handleDropdownChange}
                        />
                    </div>

                    <h2>Statistics</h2>

                    <ColumnChart
                        className={styles.statistics__column_chart}
                        measure="Views"
                        data={ColumnChartData}
                    />

                    <p>Views: {views}</p>
                </section>

                <section className={styles.statistics__select_container}>
                    <h1>My Resume</h1>

                    <hr />

                    <div className={styles.statistics__select_resume}>
                        <div
                            className={styles.statistics__select_reverse_arrow}
                        ></div>

                        <div className={styles.statistics__resumes_container}>
                            {/* <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            /> */}
                        </div>

                        <div className={styles.statistics__select_arrow}></div>
                    </div>
                </section>
            </div>
        </>
    );
};

export { StatisticsPage };
