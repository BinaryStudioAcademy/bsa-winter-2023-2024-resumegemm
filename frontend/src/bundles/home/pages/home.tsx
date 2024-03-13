import { NavLink } from 'react-router-dom';

import mockResume from '~/assets/img/mock-resume.png';
import { useLoadTemplates, useResumes } from '~/bundles/common/hooks/hooks';
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
    const { resumes } = useResumes();

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
                {resumes.map(({ id, image }) => (
                    <NavLink key={id} to={`/resumes/${id}`}>
                        <ResumeCard
                            title="My Resume"
                            subtitle="Updated - Jan 25"
                            image={image}
                        />
                    </NavLink>
                ))}
            </ResumeSection>
            <TemplateSection name="Templates">
                {templates.length > 0 &&
                    templates.map((template) => (
                        <ResumeCard
                            key={template.id}
                            title="My Resume"
                            image={template.image}
                        />
                    ))}
            </TemplateSection>
        </div>
    );
};

export { Home };
