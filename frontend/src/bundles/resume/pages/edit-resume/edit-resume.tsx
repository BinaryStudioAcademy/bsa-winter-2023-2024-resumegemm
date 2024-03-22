import { ContentType } from 'shared/build';

import { useCallback, useRef, useResumes } from '~/bundles/common/hooks/hooks';
import { useTakeScreenShot } from '~/bundles/common/hooks/use-take-screenshot/use-take-screenshot.hook';
import { OnlineEditorTabsHandler } from '~/bundles/cv-editor/components/components';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';

import styles from './styles.module.scss';

const EditResume: React.FC = () => {
    const { templateSettings } = useResumes();
    const resumeEditorReference = useRef<HTMLDivElement>(null);
    const { takeScreenshot } = useTakeScreenShot();

    const handleTakeScreenshotOnResumeUpdate = useCallback((): Promise<
        string | null
    > => {
        const DELAY = 100;
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        takeScreenshot({
                            ref: resumeEditorReference,
                            convertOptions: {
                                quality: 1,
                                type: ContentType.IMAGE_JPEG,
                            },
                        }),
                    ),
                DELAY,
            ),
        );
    }, [takeScreenshot]);

    return (
        <div className={styles.edit__resume}>
            {templateSettings && (
                <>
                    <OnlineEditorTabsHandler
                        onResumeUpdate={handleTakeScreenshotOnResumeUpdate}
                        tabs={templateSettings.containers}
                    />
                    <ResumeEditor
                        reference={resumeEditorReference}
                        templateSettings={templateSettings}
                    />
                </>
            )}
        </div>
    );
};

export { EditResume };
