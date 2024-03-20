import { FaTrash } from 'react-icons/fa6';

import { Icon } from '~/bundles/common/components/components';
import { IconButton } from '~/bundles/common/components/icon-button/icon-button';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    image: string;
    subtitle?: string;
    viewedResume?: number;
    id?: string;
    onDelete?: (id: string) => void;
};

const ResumeCard: React.FC<Properties> = ({
    title,
    image,
    subtitle,
    viewedResume,
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
                <div className={styles.resume_card__content_title}>
                    {title}
                    {viewedResume !== undefined && (
                        <div
                            className={
                                styles.resume_card__resume_views_container
                            }
                        >
                            <Icon
                                size={IconSize.SMALL}
                                name={IconName.EYE_OPEN}
                            />
                            <span
                                className={
                                    styles.resume_card__resume_views_number
                                }
                            >
                                {viewedResume}
                            </span>
                        </div>
                    )}
                </div>
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
