import mockResume from '~/assets/img/mockResume.png';

import { CreateNewCard } from './components/create-new-card/create-new-card';
import { ResumeCard } from './components/resume-card/resume-card';
import styles from './styles.module.scss';

const ResumeSection: React.FC = () => {
    return (
        <div className={styles.resumeSection}>
            <div className={styles.resumeSection__topBar}>Zaza</div>
            <div className={styles.resumeSection__content}>
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </div>
        </div>
    );
};

export { ResumeSection };
