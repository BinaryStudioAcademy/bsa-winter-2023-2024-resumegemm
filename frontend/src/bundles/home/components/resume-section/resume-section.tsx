import { PanelContainer } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
};

const ResumeSection: React.FC<Properties> = ({
    children,
    name,
}: Properties) => {
    return (
        <PanelContainer name={name}>
            <div className={styles.resume_section__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
