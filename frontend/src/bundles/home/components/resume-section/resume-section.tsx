import { type SortDirection } from 'shared/build/index.js';

import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    onSort: (sortMethod: SortDirection) => void;
};

const ResumeSection: React.FC<Properties> = ({
    children,
    name,
    onSort,
}: Properties) => {
    return (
        <PanelContainer name={name} onSort={onSort}>
            <div className={styles.resume_section__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
