import mockResume from '~/assets/img/mockResume.png';

import { CreateNewCard } from '../components/cards/create-new-card/create-new-card';
import { ResumeCard } from '../components/cards/resume-card/resume-card';
import { CreateResumeButton } from '../components/home-top-section/components/create-resume-button/create-resume-button';
import { Greeting } from '../components/home-top-section/components/greeting/greeting';
import { HomeTopSection } from '../components/home-top-section/home-top-section';
import { ResumeSection } from '../components/resume-section/resume-section';
import { TemplateSection } from '../components/template-section/template-section';
import styles from './styles.module.scss';

const Home: React.FC = () => {
    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton />
            </HomeTopSection>
            <ResumeSection name="My Resumes">
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </ResumeSection>
            <ResumeSection name="My Templates">
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
            </ResumeSection>
            <TemplateSection name="My Templates">
                <ResumeCard title="My Resume" image={mockResume} />
            </TemplateSection>
        </div>
    );
};

export { Home };
