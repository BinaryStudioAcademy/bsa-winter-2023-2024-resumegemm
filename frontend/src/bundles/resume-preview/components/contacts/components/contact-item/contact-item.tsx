import data from '~/bundles/resume-preview/data/resume-preview.json';

import styles from './styles.module.scss';

type Properties = {
    imageSrc: string;
    imageAlt: string;
    children?: React.ReactNode;
};

const ContactItem: React.FC<Properties> = ({
    imageSrc,
    imageAlt,
    children,
}) => {
    const { styles: json_styles } = data.contacts;
    return (
        <li
            className={styles.contacts__item}
            style={json_styles.contacts__item}
        >
            <img
                className={styles.contacts__item_icon}
                style={json_styles.contacts__item_icon}
                src={imageSrc}
                alt={imageAlt}
            />
            {children}
        </li>
    );
};

export { ContactItem };
