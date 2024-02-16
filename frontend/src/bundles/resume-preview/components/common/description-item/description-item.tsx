import { type DescriptionItemStyles } from '~/bundles/resume-preview/types/types';

type Properties = {
    description: string;
    className?: string;
    styles: DescriptionItemStyles;
};

const DescriptionItem: React.FC<Properties> = ({
    description,
    className = '',
    styles,
}) => {
    return (
        <li className={className} style={styles}>
            {description}
        </li>
    );
};

export { DescriptionItem };
