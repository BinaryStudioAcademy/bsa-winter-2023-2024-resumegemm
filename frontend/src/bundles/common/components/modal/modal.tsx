import { type FC } from 'react';

import crossIcon from '~/assets/img/cross.svg';
import { Button } from '~/bundles/common/components/components';
import { useModal } from '~/bundles/common/hooks/hooks';
import { type ModalProperties } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

const Modal: FC<ModalProperties> = ({ children, isOpen, onClose }) => {
    const {
        preventModalCloseOnClick,
        handleOutsideClick,
        handleModalCloseOnEscapeKey,
    } = useModal({
        onClose,
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.modal}
            role="button"
            onKeyDown={handleModalCloseOnEscapeKey} // should we disable the rule jsx-a11y/click-events-have-key-events? or I can change the implementation of outside click
            tabIndex={0}
            onClick={handleOutsideClick}
        >
            <div
                className={styles.modal_content}
                onClick={preventModalCloseOnClick}
                role="button"
                tabIndex={0}
                onKeyDown={handleModalCloseOnEscapeKey}
            >
                {children}
                <Button className={styles.content_button} onClick={onClose}>
                    {/* TODO: replace the default button with basic button once PR merged */}
                    <img src={crossIcon} alt="cross" />
                </Button>
            </div>
        </div>
    );
};

export { Modal };
