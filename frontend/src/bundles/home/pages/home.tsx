import mockResume from '~/assets/img/mock-resume.png';
import { Link, NavLink } from 'react-router-dom';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { useResumes } from '~/bundles/common/hooks/hooks';
import {
    CreateNewCard,
    CreateResumeButton,
    Greeting,
    HomeTopSection,
    RecentlyViewedTemplates,
    ResumeCard,
    ResumeSection,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

const Home: React.FC = () => {
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
                {resumes.map(({ id, image }) => (
                    <NavLink key={id} to={`/resumes/${id}`}>
                        <ResumeCard
                            title="My Resume"
                            subtitle="Updated - Jan 25"
                            image={image}
                            id={id}
                            onDelete={deleteResume}
                        />
                    </NavLink>
                ))}
            </ResumeSection>
            <TemplateSection name="Templates">
                <RecentlyViewedTemplates />
            </TemplateSection>
        </div>
    );
};

export { Home };
