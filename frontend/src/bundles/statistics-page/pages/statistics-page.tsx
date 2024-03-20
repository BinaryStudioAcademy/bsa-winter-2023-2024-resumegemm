import { useCallback, useEffect, useState } from 'react';
import { type ResumeWithShare } from 'shared/build/bundles/resumes/types/resume-with-share.type';

import { ColumnChart, Dropdown } from '~/bundles/common/components/components';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { getUserResumesWithLinks } from '../../resume-access/store/actions';
import { StatisticResumeCard } from '../components/resume-card/resume-card';
import { StatisticsPeriodsLabels } from '../enums/periods.enum';
import { actions } from '../store/statistics.store';
import styles from './styles.module.scss';

const dropdownOptions = [
    StatisticsPeriodsLabels.WEEKLY,
    StatisticsPeriodsLabels.MONTHLY,
    StatisticsPeriodsLabels.TOTAL,
];

const StatisticsPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [viewsPeriod, setViewsPeriod] = useState<string>(
        StatisticsPeriodsLabels.WEEKLY.value,
    );

    const [statisticsIds, setStatisticsIds] = useState<string[]>([]);

    const { statisticsRecords, resumes, views } = useAppSelector(
        ({ statistics, resumeAccess }) => ({
            statisticsRecords: statistics.statisticsRecords,
            resumes: resumeAccess.resumes,
            views: statistics.views,
        }),
    );

    const handleDropdownChange = useCallback((value: string | undefined) => {
        if (!value) {
            return;
        }

        setViewsPeriod(value);
    }, []);

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

                {statisticsIds.length === 0 ? (
                    <div className={styles.statistics__message_container}>
                        <h1>No resumes selected</h1>
                    </div>
                ) : (
                    <ColumnChart
                        className={styles.statistics__column_chart}
                        measure="Views"
                        data={statisticsRecords}
                    />
                )}

                <p>Views: {views}</p>
            </section>

            <section className={styles.statistics__select_container}>
                <h1 className={styles.statistics__select_title}>My Resume</h1>

                <hr className={styles.statistics__select_hr} />

                <div className={styles.statistics__select_resume}>
                    <div className={styles.statistics__resumes_container}>
                        {mapResumeCards(resumes)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export { StatisticsPage };
