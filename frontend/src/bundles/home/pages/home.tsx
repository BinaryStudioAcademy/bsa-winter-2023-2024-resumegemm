import mockResume from '~/assets/img/mock-resume.png';
import {
    useAppSelector,
    useLoadTemplates,
    useLoadViewedResumes,
} from '~/bundles/common/hooks/hooks';
import {
    CreateNewCard,
    CreateResumeButton,
    Greeting,
    HomeTopSection,
    ResumeCard,
    ResumeList,
    ResumeSection,
    TemplateList,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

const Home: React.FC = () => {
    const { resumes } = useAppSelector((state) => state.resumes);
    const { templates } = useLoadTemplates();
    const { resumeViewHistory } = useLoadViewedResumes();

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
                <ResumeList
                    resumes={resumes}
                    resumeViewHistory={resumeViewHistory}
                />
            </ResumeSection>
            <TemplateSection name="Templates">
                <TemplateList templates={templates} />
            </TemplateSection>
        </div>
    );
};

export { Home };
