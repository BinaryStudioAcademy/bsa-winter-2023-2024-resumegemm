import { FaTrash } from 'react-icons/fa6';

import { IconButton } from '~/bundles/common/components/icon-button/icon-button';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    image: string;
    subtitle?: string;
    id?: string;
    onDelete?: (resumeId: string) => void;
};

const ResumeCard: React.FC<Properties> = ({
    title,
    image,
    subtitle,
    onDelete,
    id,
}: Properties) => {
    const handleDelete = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            if (!onDelete) {
                return;
            }
            onDelete(id as NonNullable<string>);
        },
        [onDelete, id],
    );
    return (
        <div className={styles.resume_card}>
            <img src={image} alt="Resume" className={styles.resume_card__img} />
            <div className={styles.resume_card__content}>
                <span className={styles.resume_card__content_title}>
                    {title}
                </span>
                {subtitle && (
                    <span className={styles.resume_card__content_text}>
                        {subtitle}
                    </span>
                )}
            </div>
            <IconButton
                className={styles.resume_card__button}
                onClick={handleDelete}
            >
                <FaTrash />
            </IconButton>
        </div>
    );
};

export { ResumeCard };
