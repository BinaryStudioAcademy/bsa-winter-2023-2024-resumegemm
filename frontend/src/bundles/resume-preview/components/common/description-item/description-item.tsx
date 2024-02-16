import { type DescriptionItemStyles } from '~/bundles/resume-preview/types/types';

import style from './styles.module.scss';

type Properties = {
    description: string;
    styles: DescriptionItemStyles;
};

const DescriptionItem: React.FC<Properties> = ({
    description,
    styles,
}) => {
    return (
        <li className={style.section_description__item} style={styles}>
            {description}
        </li>
    );
};

export { DescriptionItem };
