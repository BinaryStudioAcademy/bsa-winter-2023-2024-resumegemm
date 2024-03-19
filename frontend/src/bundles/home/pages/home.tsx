import { Link, NavLink } from 'react-router-dom';

import mockResume from '~/assets/img/mock-resume.png';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
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
    const { resumes, deleteResume } = useResumes();

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
                {resumes.map(({ id, image, resumeTitle }) => (
                    <NavLink key={id} to={`/resumes/${id}`}>
                        <ResumeCard
                            title={resumeTitle as string}
                            subtitle="Updated - Jan 25"
                            image={image}
                            id={id}
                            onDelete={deleteResume}
                        />
                    </NavLink>
                ))}
            </ResumeSection>
            <TemplateSection name="Templates">
                {templates.length > 0 &&
                    templates.map((template) => {
                        return (
                            <Link
                                to={`${AppRoute.TEMPLATE}/${template.id}`}
                                key={template.id}
                            >
                                <ResumeCard
                                    title={template.name}
                                    image={template.image}
                                />
                            </Link>
                        );
                    })}
            </TemplateSection>
        </div>
    );
};

export { Home };
