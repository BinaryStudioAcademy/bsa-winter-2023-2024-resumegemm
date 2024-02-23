import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    onFilterOptionSelect: (option: number) => void;
};

const ResumeSection: React.FC<Properties> = ({
    children,
    name,
    onFilterOptionSelect,
}: Properties) => {
    return (
        <PanelContainer name={name} onFilterOptionSelect={onFilterOptionSelect}>
            <div className={styles.resume_section__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
