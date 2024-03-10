import { useCallback, useEffect, useState } from 'react';

import templateThirdImage from '~/assets/img/5297769.png';
import {
    ColumnChart,
    Dropdown,
    Footer,
    Header,
    NavTabs,
} from '~/bundles/common/components/components';
import { UserProfile } from '~/bundles/common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { StatisticsPeriods } from '~/bundles/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { StatisticResumeCard } from '../components/resume-card/resume-card';
import { actions } from '../store/statistics.store';
import { type StatisticsRecord } from '../types/types';
import styles from './styles.module.scss';

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
    const dispatch = useAppDispatch();

    const [viewsPeriod, setViewsPeriod] = useState<string>(
        StatisticsPeriods.WEEKLY.value,
    );

    const [views, setViews] = useState(0);

    const statisticsRecords = useAppSelector(
        ({ statistics }) => statistics.statisticsRecords,
    );

    const handleDropdownChange = useCallback((value: string | undefined) => {
        if (!value) {
            return;
        }

        setViewsPeriod(value);
    }, []);

    const handleTitle = useCallback((value: string | undefined) => {
        return dropdownOptions.find((period) => period.value === value)?.label;
    }, []);

    useEffect(() => {
        void dispatch(
            actions.getStatistics({
                resumeIds: ['0196a978-e5fc-ae7e-924d-95317038f4df'],
                type: viewsPeriod,
            }),
        );
    }, [dispatch, viewsPeriod]);

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
                        data={statisticsRecords}
                    />

                    <p>Views: {views}</p>
                </section>

                <section className={styles.statistics__select_container}>
                    <h1 className={styles.statistics__select_title}>
                        My Resume
                    </h1>

                    <hr className={styles.statistics__select_hr} />

                    <div className={styles.statistics__select_resume}>
                        <div
                            className={styles.statistics__select_reverse_arrow}
                        ></div>

                        <div className={styles.statistics__resumes_container}>
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                            <StatisticResumeCard
                                label="PHP"
                                src={templateThirdImage}
                            />
                        </div>

                        <div className={styles.statistics__select_arrow}></div>
                    </div>
                </section>
            </div>

            <Footer></Footer>
        </>
    );
};

export { StatisticsPage };
