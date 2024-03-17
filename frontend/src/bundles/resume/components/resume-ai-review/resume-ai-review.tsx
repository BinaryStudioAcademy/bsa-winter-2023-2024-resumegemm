import {
    Modal,
    RegularButton,
    Spinner,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    DataStatus,
    ModalVariant,
    SpinnerVariant,
} from '~/bundles/common/enums/enums';
import { useEffect, useReducer } from '~/bundles/common/hooks/hooks';
import { type ResumeAiScoreResponseDto } from '~/bundles/resume/types/types.js';

import styles from './styles.module.scss';

type ResumeAiReviewPayload = {
    requestResumeReviewFromAI: () => void;
    dataStatus: DataStatus;
    resumeReview: ResumeAiScoreResponseDto | null;
};

const ResumeAiReview: React.FC<ResumeAiReviewPayload> = ({
    requestResumeReviewFromAI,
    dataStatus,
    resumeReview,
}) => {
    const [isOpen, toggleModal] = useReducer((isOpen) => !isOpen, false);
    const isLoading = dataStatus === DataStatus.PENDING;

    useEffect(() => {
        if (resumeReview) {
            toggleModal();
        }
    }, [resumeReview]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={toggleModal}
                title="Overview"
                variant={ModalVariant.CONFIRM}
            >
                <div className={styles.modal__content}>
                    <div>
                        <div className={styles.resume__score__wrapper}>
                            <h2>Score:</h2>{' '}
                            <h2 className={styles.resume__score}>
                                {resumeReview?.score ?? 10}
                            </h2>
                        </div>
                        <p className={styles.resume__overview}>
                            {resumeReview?.overview}
                        </p>
                    </div>
                    <RegularButton
                        variant={ButtonVariant.GHOST}
                        size={ButtonSize.MEDIUM}
                        type={ButtonType.BUTTON}
                        className={styles.modal__cancel__button}
                        onClick={toggleModal}
                    >
                        Got it!
                    </RegularButton>
                </div>
            </Modal>
            <RegularButton
                onClick={requestResumeReviewFromAI}
                variant={ButtonVariant.DEFAULT}
            >
                View AI response
                {isLoading && <Spinner variant={SpinnerVariant.SMALL} />}
            </RegularButton>
        </>
    );
};

export { ResumeAiReview };
