import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { type SortDirection, SearchParameters } from 'shared/build/index.js';

import mockResume from '~/assets/img/mock-resume.png';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    useAppDispatch,
    useCallback,
    useEffect,
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
import { loadAllTemplates } from '~/bundles/templates-page/store/actions';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

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

    const { resumeViews, deleteResume } = useResumes({
        name: resumeName,
    });

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

    useEffect(() => {
        dispatch(resumeActions.getViewsCountByUserId()).catch(
            (error: Error) => {
                showToast(error.message, ToastType.ERROR);
            },
        );
    }, [dispatch]);

    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton />
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
                {resumeViews && resumeViews.length > 0 ? (
                    resumeViews?.map(
                        ({ id, image, resumeTitle, views, updatedAt }) => (
                            <NavLink key={id} to={`/resumes/${id}`}>
                                <ResumeCard
                                    title={resumeTitle}
                                    subtitle={`Updated - ${updatedAt}`}
                                    image={image}
                                    id={id}
                                    onDelete={deleteResume}
                                    viewedResume={views}
                                />
                            </NavLink>
                        ),
                    )
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
                                    title={template.name}
                                    image={template.image}
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
