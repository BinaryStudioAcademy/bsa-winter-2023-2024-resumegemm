import { Header, RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useResumes } from '~/bundles/common/hooks/hooks';
import { OnlineEditorTabsHandler } from '~/bundles/cv-editor/components/components';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';

import styles from './styles.module.scss';

const CreateResume: React.FC = () => {
    const { templateSettings, createResume } = useResumes();

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
                        <ResumeEditor templateSettings={templateSettings} />
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
