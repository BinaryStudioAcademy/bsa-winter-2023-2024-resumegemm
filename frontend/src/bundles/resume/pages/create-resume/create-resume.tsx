import { Header, RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useResumes } from '~/bundles/common/hooks/hooks';
import { OnlineEditorTabsHandler } from '~/bundles/cv-editor/components/components';
import { TemplateEditor } from '~/bundles/edit-template/components/template-editor/template-editor';

import styles from './styles.module.scss';

const CreateResume: React.FC = () => {
    const { templateSettings, createResume, setTemplateSettingsMockData } =
        useResumes();

    return (
        <>
            <Header />
            <div className={styles.create__resume}>
                {templateSettings && (
                    <>
                        <OnlineEditorTabsHandler
                            tabs={templateSettings.containers}
                            isCreate
                        />
                        <TemplateEditor
                            templateSettings={templateSettings}
                            setTemplateSettings={setTemplateSettingsMockData}
                        />
                    </>
                )}
                <RegularButton
                    variant={ButtonVariant.PRIMARY}
                    className={styles.create__resume__button}
                    onClick={createResume}
                >
                    Create Resume
                </RegularButton>
            </div>
        </>
    );
};

export { CreateResume };
