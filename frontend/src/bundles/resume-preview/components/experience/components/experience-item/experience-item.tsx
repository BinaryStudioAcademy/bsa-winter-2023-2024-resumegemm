import { svg } from '~/assets/img/resume_preview/resume-svg';
import { DescriptionItem } from '~/bundles/resume-preview/components/common/description-item/description-item';
import { formatDate } from '~/bundles/resume-preview/components/experience/helpers/format-date';
import {
    type ExperienceData,
    type ExperienceStyles,
} from '~/bundles/resume-preview/types/types';

import styles from './styles.module.scss';

interface ExperienceItemProperties {
    item: ExperienceData;
    json_styles: ExperienceStyles;
}

const ExperienceItem: React.FC<ExperienceItemProperties> = ({
    item,
    json_styles,
}) => {
    const {
        company_logo,
        job_position,
        company,
        employment_type,
        location_type,
        start_date,
        end_date,
        description,
        work_location: { city, country, state },
    } = item;

    const formatedStartDate = formatDate({ date: start_date });
    const formatedEndDate = formatDate({ date: end_date });

    return (
        <li className={styles.section__body_item}>
            <div className={styles.section__body_image}>
                <img
                    src={
                        company_logo.length > 0
                            ? svg.notchLogo
                            : svg.emptyCompanyLogo
                    }
                    alt="Company Logo"
                />
            </div>
            <div className={styles.experience__info}>
                <h4
                    className={styles.experience__info_job_position}
                    style={json_styles.experience__info_job_position}
                >
                    {job_position}
                </h4>
                <div className={styles.experience__info_work_wrapper}>
                    <p style={json_styles.experience__info_company}>
                        {company}
                    </p>
                    <span className={styles.experience__dot_devider}></span>
                    {employment_type && (
                        <>
                            <p
                                style={
                                    json_styles.experience__info_employment_type
                                }
                            >
                                {employment_type}
                            </p>
                            <span
                                className={styles.experience__dot_devider}
                            ></span>
                        </>
                    )}
                    <p style={json_styles.experience__info_location_type}>
                        {location_type}
                    </p>
                    <span className={styles.experience__dot_devider}></span>
                    <p style={json_styles.experience__info_work_period}>
                        {formatedStartDate}
                    </p>
                    <p style={json_styles.experience__info_work_period}>
                        {formatedEndDate}
                    </p>
                </div>
                <div
                    className={styles.experience__info_work_location}
                    style={json_styles.experience__info_work_location}
                >
                    <span>{city}</span>
                    {state && <span>, {state}</span>}
                    <span>, {country}</span>
                </div>
                <ul className={styles.section_description__list}>
                    {description.map((description, index) => (
                        <DescriptionItem
                            key={index}
                            description={description}
                            styles={
                                json_styles.experience__info_description_item
                            }
                        />
                    ))}
                </ul>
            </div>
        </li>
    );
};

export { ExperienceItem };
