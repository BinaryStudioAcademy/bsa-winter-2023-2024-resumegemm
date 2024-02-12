import { PanelContainer } from '../panel-container/panel-container';
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
        <PanelContainer name={name} classname={styles.resumeSection}>
            <div className={styles.resumeSection__cards}>{children}</div>
        </PanelContainer>
    );
};

export { ResumeSection };
