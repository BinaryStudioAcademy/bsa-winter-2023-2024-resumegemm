import { useCallback } from 'react';

import { ButtonTheme } from '~/bundles/common/enums/enums';

import { Button } from '../../components';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
    const editTemplateHandler = useCallback(() => {
        //TODO: Edit template functionality
    }, []);

    const saveAndPublishTemplateHandler = useCallback(() => {
        //TODO: Save and publish template functionality
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footer_controls}>
                <Button
                    label="Edit template"
                    theme={ButtonTheme.TRANSPARENT_WITH_BORDERS}
                    onClick={editTemplateHandler}
                />
                <Button
                    label="Save & Publish"
                    theme={ButtonTheme.BLUE}
                    onClick={saveAndPublishTemplateHandler}
                />
            </div>
        </footer>
    );
};

export { Footer };
