import mockResume from '~/assets/img/mock-resume.png';
import { useLoadTemplates } from '~/bundles/common/hooks/use-load-templates/use-load-templates.hook';
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
    const { templates } = useLoadTemplates();

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
                {templates.length > 0 &&
                    templates.map((template) => {
                        return (
                            <ResumeCard
                                key={template.id}
                                title="My Resume"
                                image={template.image}
                            />
                        );
                    })}
            </TemplateSection>
        </div>
    );
};

export { Home };
