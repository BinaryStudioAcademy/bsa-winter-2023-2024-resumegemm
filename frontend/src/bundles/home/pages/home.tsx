import mockResume from '~/assets/img/mockResume.png';
import {
    CreateNewCard,
    CreateResumeButton,
    Greeting,
    HomeTopSection,
    ResumeCard,
    ResumeSection,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

const Home: React.FC = () => {
    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton />
            </HomeTopSection>
            <ResumeSection name="Recently viewed">
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </ResumeSection>
            <ResumeSection name="Users' resume">
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
            </ResumeSection>
            <TemplateSection name="Templates">
                <ResumeCard title="My Resume" image={mockResume} />
            </TemplateSection>
        </div>
    );
};

export { Home };
