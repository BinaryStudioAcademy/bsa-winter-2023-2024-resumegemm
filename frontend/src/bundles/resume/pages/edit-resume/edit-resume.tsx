import { useResumes } from '~/bundles/common/hooks/hooks';
import { OnlineEditorTabsHandler } from '~/bundles/cv-editor/components/components';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';

import styles from './styles.module.scss';

const EditResume: React.FC = () => {
    const { templateSettings } = useResumes();
    return (
        <div className={styles.edit__resume}>
            {templateSettings && (
                <>
                    <OnlineEditorTabsHandler
                        tabs={templateSettings.containers}
                    />
                    <ResumeEditor templateSettings={templateSettings} />
                </>
            )}
        </div>
    );
};

export { EditResume };
