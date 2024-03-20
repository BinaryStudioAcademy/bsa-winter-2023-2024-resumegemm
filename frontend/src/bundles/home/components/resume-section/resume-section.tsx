import { type SortDirection } from 'shared/build/index.js';

import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    onSort: (sortMethod: SortDirection) => void;
    onHandleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const ResumeSection: React.FC<Properties> = ({
    children,
    name,
    onSort,
    onHandleSearch,
}: Properties) => {
    return (
        <PanelContainer
            name={name}
            onSort={onSort}
            onHandleSearch={onHandleSearch}
        >
            <div className={styles.resume_section__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
