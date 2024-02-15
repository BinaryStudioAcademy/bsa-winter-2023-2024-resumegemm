import data from '../../data/resume-preview.json';
import {
    Contacts,
    Design,
    Education,
    Experience,
    Languages,
    Portfolio,
    Profile,
    Recommendations,
    Socials,
    Summary,
    TechStack,
} from '../components';
import styles from './styles.module.scss';

const ResumePreview: React.FC = () => {
    return (
        <div className={styles.resume_preview__wrapper}>
            <Profile />
            <Contacts />
            <div className={styles.resume_preview__content}>
                <div className={styles.resume_preview__content_main_section}>
                    <Summary
                        data={data.summary}
                        json_styles={{
                            ...data.summary.styles,
                            summary__description_item: {
                                ...data.summary.styles
                                    .summary__description_item,
                                listStylePosition: data.summary.styles
                                    .summary__description_item
                                    .listStylePosition as 'inside' | 'outside',
                            },
                        }}
                    />
                    <Experience />
                    <Recommendations />
                </div>
                <div className={styles.resume_preview__content_aside_section}>
                    <Design
                        data={data.skills}
                        json_styles={{
                            ...data.skills.styles,
                            skills__description_item: {
                                ...data.skills.styles.skills__description_item,
                                listStylePosition: data.skills.styles
                                    .skills__description_item
                                    .listStylePosition as 'inside' | 'outside',
                            },
                        }}
                    />
                    <TechStack
                        data={data.tech_stack}
                        json_styles={data.tech_stack.styles}
                    />
                    <Portfolio
                        data={data.portfolio.data}
                        json_styles={data.portfolio.styles}
                    />
                    <Languages
                        data={data.languages}
                        json_styles={data.languages.styles}
                    />
                    <Education
                        data={data.education.data}
                        json_styles={data.education.styles}
                    />
                    <Socials
                        data={data.social_links}
                        json_styles={data.social_links.styles}
                    />
                </div>
            </div>
        </div>
    );
};

export { ResumePreview };
