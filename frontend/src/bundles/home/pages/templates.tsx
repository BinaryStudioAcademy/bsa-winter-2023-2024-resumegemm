import mockResume from '~/assets/img/mock-resume.png';
import {
    HomeTopSection,
    ResumeCard,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

type TemplatesProperties = {
    onFilterOptionSelect: (option: number) => void;
};

const Templates: React.FC<TemplatesProperties> = ({ onFilterOptionSelect }) => {
    return (
        <div className={styles.layout}>
            <HomeTopSection />
            <TemplateSection
                onFilterOptionSelect={onFilterOptionSelect}
                name="Templates"
                cardLayout={styles.template_page__card_layout}
            >
                <ResumeCard title="My Resume" image={mockResume} />
            </TemplateSection>
        </div>
    );
};

export { Templates };
