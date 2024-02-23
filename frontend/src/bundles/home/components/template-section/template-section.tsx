import clsx from 'clsx';

import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    cardLayout?: string;
    onFilterOptionSelect: (options: number) => void;
};

const TemplateSection: React.FC<Properties> = ({
    children,
    name,
    cardLayout,
    onFilterOptionSelect,
}: Properties) => {
    return (
        <PanelContainer
            name={name}
            classname={styles.template_section}
            onFilterOptionSelect={onFilterOptionSelect}
        >
            <div className={clsx(styles.template_section__cards, cardLayout)}>
                {children}
            </div>
        </PanelContainer>
    );
};

export { TemplateSection };
