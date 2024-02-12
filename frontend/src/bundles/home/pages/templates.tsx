import mockResume from '~/assets/img/mockResume.png';
import {
    HomeTopSection,
    ResumeCard,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

const Templates: React.FC = () => {
    return (
        <div className={styles.layout}>
            <HomeTopSection />
            <TemplateSection
                name="Templates"
                cardLayout={styles.templatesLayout}
            >
                <ResumeCard title="My Resume" image={mockResume} />
            </TemplateSection>
        </div>
    );
};

export { Templates };
