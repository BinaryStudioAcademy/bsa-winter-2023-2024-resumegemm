import { Modal, RegularButton } from '../../../common/components/components.js';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ModalVariant,
} from '../../../common/enums/enums';
import styles from './styles.module.scss';

type DeleteResumeModalProperties = {
    onClose: () => void;
};

const DeleteResumeModal: React.FC<DeleteResumeModalProperties> = ({
    onClose,
}) => {
    return (
        <Modal
            title="Delete Resume"
            isOpen={true}
            onClose={onClose}
            variant={ModalVariant.CONFIRM}
        >
            <div className={styles.modal_content}>
                <p>
                    Are you sure you want to delete this resume? Once deleted
                    this resume cannot be restored.
                </p>
                <div className={styles.modal_buttons}>
                    <RegularButton
                        variant={ButtonVariant.GHOST}
                        size={ButtonSize.MEDIUM}
                        type={ButtonType.BUTTON}
                        className={styles.modal__delete__button}
                    >
                        Delete
                    </RegularButton>
                    <RegularButton
                        variant={ButtonVariant.GHOST}
                        size={ButtonSize.MEDIUM}
                        type={ButtonType.BUTTON}
                        className={styles.modal__cancel__button}
                        onClick={onClose}
                    >
                        Cancel
                    </RegularButton>
                </div>
            </div>
        </Modal>
    );
};

export { DeleteResumeModal };
