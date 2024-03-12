import { useCallback, useEffect, useState } from 'react';
import { type ResumeWithShare } from 'shared/build/bundles/resumes/types/resume-with-share.type';

import {
    ColumnChart,
    Dropdown,
    Footer,
    Header,
    NavTabs,
} from '~/bundles/common/components/components';
import { UserProfile } from '~/bundles/common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { getUserResumesWithLinks } from '../../resume-access/store/actions';
import { StatisticResumeCard } from '../components/resume-card/resume-card';
import { StatisticsPeriodsLabels } from '../enums/periods.enum';
import { actions } from '../store/statistics.store';
import { type StatisticsRecord } from '../types/types';
import styles from './styles.module.scss';

const headerItems = [
    { label: 'Home', path: AppRoute.ROOT },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];
const dropdownOptions = [
    StatisticsPeriodsLabels.WEEKLY,
    StatisticsPeriodsLabels.MONTHLY,
    StatisticsPeriodsLabels.TOTAL,
];

const defaultData = [['today', 0]];

const StatisticsPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [viewsPeriod, setViewsPeriod] = useState<string>(
        StatisticsPeriodsLabels.WEEKLY.value,
    );

    const [statisticsIds, setStatisticsIds] = useState<string[]>([]);

    const statisticsRecords = useAppSelector(
        ({ statistics }) => statistics.statisticsRecords,
    );

    const resumes = useAppSelector(({ resumeAccess }) => resumeAccess.resumes);

    const views = useAppSelector(({ statistics }) => statistics.views);

    const handleDropdownChange = useCallback((value: string | undefined) => {
        if (!value) {
            return;
        }

        setViewsPeriod(value);
    }, []);

    const handleData = useCallback(
        (statisticsRecords: StatisticsRecord[]): StatisticsRecord[] => {
            return statisticsRecords.length === 0
                ? (defaultData as StatisticsRecord[])
                : statisticsRecords;
        },
        [],
    );

    const handleCheck = useCallback(
        (id: string) => {
            return function () {
                if (statisticsIds.includes(id)) {
                    setStatisticsIds(
                        statisticsIds.filter((item) => item !== id),
                    );
                    return;
                }

                setStatisticsIds([...statisticsIds, id]);
            };
        },
        [statisticsIds],
    );

    const mapResumeCards = useCallback(
        (resumesWithShare: ResumeWithShare[]) => {
            return resumesWithShare.map((resumeWithShare) => {
                const { resume, shareId } = resumeWithShare;

                if (!resume?.resumeTitle) {
                    return;
                }

                return (
                    <StatisticResumeCard
                        onCheck={handleCheck(shareId)}
                        key={resume.id}
                        label={resume.resumeTitle}
                        src={resume.image}
                    />
                );
            });
        },
        [handleCheck],
    );

    const handleTitle = useCallback((value: string | undefined) => {
        return dropdownOptions.find((period) => period.value === value)?.label;
    }, []);

    useEffect(() => {
        void dispatch(
            actions.getStatistics({
                resumeIds: statisticsIds,
                period: viewsPeriod,
            }),
        );
    }, [dispatch, viewsPeriod, statisticsIds]);

    useEffect(() => {
        void dispatch(getUserResumesWithLinks());
    }, [dispatch]);

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
                        data={handleData(statisticsRecords)}
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
                            {mapResumeCards(resumes)}
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
