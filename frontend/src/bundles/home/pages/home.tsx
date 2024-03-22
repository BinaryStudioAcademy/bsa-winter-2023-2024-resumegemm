import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { type SortDirection, SearchParameters } from 'shared/build/index.js';

import mockResume from '~/assets/img/mock-resume.png';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    useAppDispatch,
    useCallback,
    useLoadTemplates,
    useResumes,
    useSearch,
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
import {
    deleteTemplate,
    loadAllTemplates,
} from '~/bundles/templates-page/store/actions';
import { formatDateToLocaleString } from '~/helpers/format-date-to-locale-string.helper';

import styles from './styles.module.scss';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParameters] = useSearchParams();

    const templateName =
        searchParameters.get(SearchParameters.TEMPLATE_NAME) ?? '';

    const { templates } = useLoadTemplates({
        name: templateName,
    });

    const resumeName = searchParameters.get(SearchParameters.RESUME_NAME) ?? '';

    const { resumes, deleteResume } = useResumes({ name: resumeName });

    const recentlyViewedResumeName =
        searchParameters.get(SearchParameters.RECENTLY_VIEWED_RESUME_NAME) ??
        '';

    const handleResumeSearch = useSearch(SearchParameters.RESUME_NAME);

    const handleRecentlyViewedResumeSearch = useSearch(
        SearchParameters.RECENTLY_VIEWED_RESUME_NAME,
    );

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

    const handleTemplateDelete = useCallback(
        (id: string) => {
            void dispatch(deleteTemplate(id));
        },
        [dispatch],
    );

    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton templates={templates} />
            </HomeTopSection>
            <ResumeSection
                onSort={handleRecentlyViewedSort}
                name="Recently viewed"
                onHandleSearch={handleRecentlyViewedResumeSearch}
                defaultSearchValue={recentlyViewedResumeName}
            >
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </ResumeSection>
            <ResumeSection
                onSort={handleResumesSort}
                name="Users' resume"
                onHandleSearch={handleResumeSearch}
                defaultSearchValue={resumeName}
            >
                {resumes.length > 0 ? (
                    resumes.map(({ id, image, resumeTitle, updatedAt }) => (
                        <NavLink key={id} to={`/resumes/${id}`}>
                            <ResumeCard
                                title={resumeTitle as string}
                                subtitle={`Updated - ${formatDateToLocaleString(
                                    updatedAt as string,
                                )}`}
                                image={image}
                                id={id}
                                onDelete={deleteResume}
                            />
                        </NavLink>
                    ))
                ) : (
                    <p className={styles.template_not_found_message}>
                        No results found for your search
                    </p>
                )}
            </ResumeSection>
            <TemplateSection onSort={handleTemplatesSort} name="Templates">
                {templates.length > 0 ? (
                    templates.map((template) => {
                        return (
                            <Link
                                to={`${AppRoute.TEMPLATE}/${template.id}`}
                                key={template.id}
                            >
                                <ResumeCard
                                    id={template.id}
                                    title={template.name}
                                    image={template.image}
                                    onDelete={handleTemplateDelete}
                                    subtitle={`Updated - ${formatDateToLocaleString(
                                        template.updatedAt,
                                    )}`}
                                />
                            </Link>
                        );
                    })
                ) : (
                    <p className={styles.template_not_found_message}>
                        No results found for your search
                    </p>
                )}
            </TemplateSection>
        </div>
    );
};

export { Home };
