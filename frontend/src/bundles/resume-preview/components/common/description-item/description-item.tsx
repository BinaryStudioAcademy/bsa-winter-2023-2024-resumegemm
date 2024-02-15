import { type DescriptionItemStyles } from '~/bundles/resume-preview/types/types';

interface DescriptionItemProperties {
    description: string;
    className?: string;
    styles: DescriptionItemStyles;
}

const DescriptionItem: React.FC<DescriptionItemProperties> = ({
    description,
    className,
    styles,
}) => {
    return <li className={className} style={styles} >{description}</li>;
};

export { DescriptionItem };
