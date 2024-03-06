import clsx from 'clsx';

import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    hasIconInput?: boolean;
    cardLayout?: string;
};

const TemplateSection: React.FC<Properties> = ({
    children,
    name,
    hasIconInput = true,
    cardLayout,
}: Properties) => {
    return (
        <PanelContainer
            hasIconInput={hasIconInput}
            name={name}
            className={styles.template_section}
        >
            <div className={clsx(styles.template_section__cards, cardLayout)}>
                {children}
            </div>
        </PanelContainer>
    );
};

export { TemplateSection };
