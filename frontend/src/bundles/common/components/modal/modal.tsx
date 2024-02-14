import clsx from 'clsx';
import { type FC } from 'react';

import crossIcon from '~/assets/img/cross.svg';
import { Button } from '~/bundles/common/components/components';
import { useModal } from '~/bundles/common/hooks/hooks';
import { type ModalProperties } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

const Modal: FC<ModalProperties> = ({
    children,
    isOpen,
    onClose,
    title,
    variant,
}) => {
    const {
        preventModalCloseOnClick,
        handleOutsideClick,
        handleModalCloseOnEscapeKey,
    } = useModal({
        onClose,
        isOpen,
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.modal}
            role="button"
            onKeyDown={handleModalCloseOnEscapeKey}
            tabIndex={0}
            onClick={handleOutsideClick}
        >
            <div
                className={clsx(
                    styles.modal_content,
                    styles[`modal_variant__${variant}`],
                )}
                onClick={preventModalCloseOnClick}
                role="button"
                tabIndex={0}
                onKeyDown={handleModalCloseOnEscapeKey}
            >
                <Button className={styles.content_button} onClick={onClose}>
                    {/* TODO: replace the default button with basic button once PR merged */}
                    <img src={crossIcon} alt="cross" />
                </Button>
                <div className={styles.content_title}>{title}</div>
                <div className={styles.content_body}>{children}</div>
                <div className={styles.content_actions}></div>
            </div>
        </div>
    );
};

export { Modal };
