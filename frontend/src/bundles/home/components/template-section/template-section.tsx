import { PanelContainer } from '../panel-container/panel-container';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    classname?: string;
};

const TemplateSection: React.FC<Properties> = ({
    children,
    name,
    classname,
}: Properties) => {
    return (
        <PanelContainer
            name={name}
            classname={`${styles.templateSection} ${classname ?? ''}`}
        >
            <div className={styles.templateSection__cards}>{children}</div>
        </PanelContainer>
    );
};

export { TemplateSection };
