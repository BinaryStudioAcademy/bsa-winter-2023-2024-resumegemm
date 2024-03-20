import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    onHandleSearch: React.ChangeEventHandler<HTMLInputElement>;
    defaultSearchValue: string;
};

const ResumeSection: React.FC<Properties> = ({
    children,
    name,
    onHandleSearch,
    defaultSearchValue = '',
}: Properties) => {
    return (
        <PanelContainer
            name={name}
            onHandleSearch={onHandleSearch}
            defaultSearchValue={defaultSearchValue}
        >
            <div className={styles.resume_section__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
