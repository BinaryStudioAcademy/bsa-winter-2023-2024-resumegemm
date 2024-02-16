import clsx from 'clsx';

import {
    type SocialsData,
    type SocialsStyles,
} from '~/bundles/resume-preview/types/types';

import { Badge } from '../components';
import styles from './styles.module.scss';

type Propperties = {
    data: SocialsData;
    json_styles: SocialsStyles;
};

const Socials: React.FC<Propperties> = ({ data, json_styles }) => {
    return (
        <div
            className={clsx(
                styles.resume_preview__section_wrapper,
                styles.social__wrapper,
            )}
        >
            <div className={styles.resume_preview__aside_section_header}>
                <h3 className={styles.section_header__title}>Social Links</h3>
                <Badge title="let's be friends" />
            </div>
            <ul className={styles.social__list}>
                {data.data.map((item, index) => (
                    <li
                        key={index}
                        className={styles.social__item}
                        style={json_styles.social__item}
                    >
                        {item.platform}:{' '}
                        <a
                            href={`${item.url}${item.username}`}
                            style={json_styles.social__link}
                        >
                            @{item.username}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Socials };
