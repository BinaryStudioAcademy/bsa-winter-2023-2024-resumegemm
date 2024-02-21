import data from '~/bundles/resume-preview/data/resume-preview.json';

import {
    Contacts,
    Education,
    Experience,
    Languages,
    Portfolio,
    Profile,
    Recommendations,
    Skills,
    Socials,
    Summary,
    TechStack,
} from '../../resume-preview/components/components';
import styles from '../../resume-preview/components/resume-preview/styles.module.scss';
import { TemplateBlockTitles } from '../types/types';

type SelectedBlocks = {
    selectedBlocks: Record<string, boolean>;
};

const EditableTemplate: React.FC<SelectedBlocks> = ({ selectedBlocks }) => (
    <div>
        <div className={styles.resume_preview__wrapper}>
            {selectedBlocks[TemplateBlockTitles.Profile] && <Profile />}
            {selectedBlocks[TemplateBlockTitles.Contacts] && <Contacts />}
            <div className={styles.resume_preview__content}>
                <div className={styles.resume_preview__content_main_section}>
                    {selectedBlocks[TemplateBlockTitles.Summary] && (
                        <Summary
                            data={data.summary}
                            json_styles={data.summary.styles}
                        />
                    )}
                    {selectedBlocks[TemplateBlockTitles.Experience] && (
                        <Experience />
                    )}
                    {selectedBlocks[TemplateBlockTitles.Recommendations] && (
                        <Recommendations />
                    )}
                </div>
                <div className={styles.resume_preview__content_aside_section}>
                    {selectedBlocks[TemplateBlockTitles.Skills] && (
                        <Skills
                            data={data.skills}
                            json_styles={data.skills.styles}
                        />
                    )}
                    {selectedBlocks[TemplateBlockTitles.TechStack] && (
                        <TechStack
                            data={data.tech_stack}
                            json_styles={data.tech_stack.styles}
                        />
                    )}
                    {selectedBlocks[TemplateBlockTitles.Portfolio] && (
                        <Portfolio
                            data={data.portfolio.data}
                            json_styles={data.portfolio.styles}
                        />
                    )}
                    {selectedBlocks[TemplateBlockTitles.Languages] && (
                        <Languages
                            data={data.languages}
                            json_styles={data.languages.styles}
                        />
                    )}
                    {selectedBlocks[TemplateBlockTitles.Education] && (
                        <Education
                            data={data.education.data}
                            json_styles={data.education.styles}
                        />
                    )}
                    {selectedBlocks[TemplateBlockTitles.Socials] && (
                        <Socials
                            data={data.social_links}
                            json_styles={data.social_links.styles}
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
);

export { EditableTemplate };
