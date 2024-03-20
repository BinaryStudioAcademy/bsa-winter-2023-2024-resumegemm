import data from '~/bundles/resume-preview/data/resume-preview.json';

import {
    Contacts,
    Education,
    Experience,
    Languages,
    Profile,
} from '../../resume-preview/components/components';
import styles from '../../resume-preview/components/resume-preview/styles.module.scss';
import { TemplateBlockTitles } from '../../templates-page/types/types';
import templateStyles from './styles.module.scss';

type SelectedBlocks = {
    selectedBlocks: Record<string, boolean>;
};

const EditableTemplate: React.FC<SelectedBlocks> = ({ selectedBlocks }) => (
    <div className={templateStyles.template__container}>
        <div className={styles.resume_preview__wrapper}>
            {selectedBlocks[TemplateBlockTitles.Profile] && <Profile />}
            {selectedBlocks[TemplateBlockTitles.Contacts] && <Contacts />}
            <div className={styles.resume_preview__content}>
                <div className={styles.resume_preview__content_main_section}>
                    {selectedBlocks[TemplateBlockTitles.Experience] && (
                        <Experience />
                    )}
                </div>
                <div className={styles.resume_preview__content_aside_section}>
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
                </div>
            </div>
        </div>
    </div>
);

export { EditableTemplate };
