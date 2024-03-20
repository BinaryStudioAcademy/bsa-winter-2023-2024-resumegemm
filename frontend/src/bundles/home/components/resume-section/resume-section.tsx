import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    onHandleSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const ResumeSection: React.FC<Properties> = ({
    children,
    name,
    onHandleSearch,
}: Properties) => {
    return (
        <PanelContainer name={name} onHandleSearch={onHandleSearch}>
            <div className={styles.resume_section__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
