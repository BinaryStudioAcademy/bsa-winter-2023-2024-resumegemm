import { useResumes } from '~/bundles/common/hooks/hooks';
import { OnlineEditorTabsHandler } from '~/bundles/cv-editor/components/components';
import { TemplateEditor } from '~/bundles/edit-template/components/template-editor/template-editor';

import styles from './styles.module.scss';

const EditResume: React.FC = () => {
    const { templateSettings, setTemplateSettingsMockData } = useResumes();
    return (
        <div className={styles.edit__resume}>
            {templateSettings && (
                <>
                    <OnlineEditorTabsHandler
                        tabs={templateSettings.containers}
                    />
                    <TemplateEditor
                        templateSettings={templateSettings}
                        setTemplateSettings={setTemplateSettingsMockData}
                    />
                </>
            )}
        </div>
    );
};

export { EditResume };
