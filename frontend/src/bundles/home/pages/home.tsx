import { Link, NavLink } from 'react-router-dom';
import { type SortDirection } from 'shared/build/index.js';

import mockResume from '~/assets/img/mock-resume.png';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    useAppDispatch,
    useCallback,
    useLoadTemplates,
    useResumes,
} from '~/bundles/common/hooks/hooks';
import {
    CreateNewCard,
    CreateResumeButton,
    Greeting,
    HomeTopSection,
    ResumeCard,
    ResumeSection,
    TemplateSection,
} from '~/bundles/home/components/components';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import { loadAllTemplates } from '~/bundles/templates-page/store/actions';

import styles from './styles.module.scss';

const Home: React.FC = () => {
    const { templates } = useLoadTemplates();
    const { resumes, deleteResume } = useResumes();
    const dispatch = useAppDispatch();

    const handleResumesSort = useCallback(
        (sortMethod: SortDirection) => {
            const direction = sortMethod ?? undefined;
            void dispatch(resumeActions.getAllResumes({ direction }));
        },
        [dispatch],
    );

    const handleTemplatesSort = useCallback(
        (sortMethod: SortDirection) => {
            const direction = sortMethod ?? undefined;
            void dispatch(loadAllTemplates({ direction }));
        },
        [dispatch],
    );

    const handleRecentlyViewedSort = useCallback(() => {
        // TODO: add after adding recently viewed resumes
    }, []);

    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton />
            </HomeTopSection>
            <ResumeSection
                onSort={handleRecentlyViewedSort}
                name="Recently viewed"
            >
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </ResumeSection>
            <ResumeSection onSort={handleResumesSort} name="Users' resume">
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
            <TemplateSection onSort={handleTemplatesSort} name="Templates">
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
