import clsx from 'clsx';
import { useCallback, useState } from 'react';

import { BaseButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    children?: React.ReactNode;
};

const QuestionAndAnswerItem: React.FC<Properties> = ({ title, children }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = useCallback(() => {
        setSelected(!selected);
    }, [selected]);

    return (
        <div
            className={clsx(
                styles.question_and_answer_item__container,
                !selected &&
                    styles.question_and_answer_item__container_selected,
            )}
        >
            <div className={styles.question_and_answer_item__title_container}>
                <BaseButton
                    onClick={handleClick}
                    className={styles.question_and_answer_item__title}
                    variant={ButtonVariant.GHOST}
                >
                    {title}
                </BaseButton>
                <BaseButton
                    onClick={handleClick}
                    className={clsx(
                        styles.question_and_answer_item__title_image_container,
                        selected &&
                            styles.question_and_answer_item__title_image_container_selected,
                    )}
                ></BaseButton>
            </div>

            <hr
                className={clsx(
                    styles.question_and_answer_item__vertical_line,
                    !selected &&
                        styles.question_and_answer_item__vertical_line_hidden,
                )}
            />

            <div
                className={clsx(
                    styles.question_and_answer_item__content_container,
                    !selected &&
                        styles.question_and_answer_item__content_container_hidden,
                )}
            >
                {children}
            </div>
        </div>
    );
};

export { QuestionAndAnswerItem };
