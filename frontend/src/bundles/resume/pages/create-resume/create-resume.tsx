import { NavLink } from 'react-router-dom';

import { Header, RegularButton } from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonVariant,
    ContentType,
    ToastType,
} from '~/bundles/common/enums/enums';
import { useCallback, useRef, useResumes } from '~/bundles/common/hooks/hooks';
import { useTakeScreenShot } from '~/bundles/common/hooks/use-take-screenshot/use-take-screenshot.hook';
import { OnlineEditorTabsHandler } from '~/bundles/cv-editor/components/components';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import styles from './styles.module.scss';

const CreateResume: React.FC = () => {
    const { templateSettings, createResume } = useResumes();
    const { takeScreenshot } = useTakeScreenShot();
    const resumeReference = useRef<HTMLDivElement>(null);

    const handleTakeScreenshotAndCreateResume = useCallback((): void => {
        takeScreenshot({
            ref: resumeReference,
            convertOptions: { quality: 1, type: ContentType.IMAGE_JPEG },
        })
            .then((screenshot) => createResume(screenshot as string))
            .catch((error) =>
                showToast((error as Error).message, ToastType.ERROR),
            );
    }, [createResume, takeScreenshot]);

    return (
        <div className={styles.create__resume__wrapper}>
            <Header />
            <div className={styles.create__resume}>
                {templateSettings && (
                    <>
                        <OnlineEditorTabsHandler
                            tabs={templateSettings.containers}
                            isCreate
                        />
                        <ResumeEditor
                            reference={resumeReference}
                            templateSettings={templateSettings}
                        />
                    </>
                )}
            </div>
            <div className={styles.create__resume__actions}>
                <NavLink to={AppRoute.HOME}>
                    <RegularButton
                        variant={ButtonVariant.OUTLINED}
                        className={styles.create__resume__back__button}
                    >
                        Back
                    </RegularButton>
                </NavLink>
                <RegularButton
                    variant={ButtonVariant.PRIMARY}
                    className={styles.create__resume__button}
                    onClick={handleTakeScreenshotAndCreateResume}
                >
                    Create Resume
                </RegularButton>
            </div>
        </div>
    );
};

export { CreateResume };
