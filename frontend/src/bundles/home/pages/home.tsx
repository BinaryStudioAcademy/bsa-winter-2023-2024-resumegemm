import { useSearchParams } from 'react-router-dom';
import { SearchParameters } from 'shared/build/index.js';

import mockResume from '~/assets/img/mock-resume.png';
import {
    useAppSelector,
    useLoadTemplates,
    useSearch,
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
    const [searchParameters] = useSearchParams();

    const templateName =
        searchParameters.get(SearchParameters.TEMPLATE_NAME) ?? '';

    const { templates } = useLoadTemplates({
        name: templateName,
    });

    const resumeName = searchParameters.get(SearchParameters.RESUME_NAME) ?? '';

    // const { resumes, deleteResume } = useResumes({ name: resumeName });
    const resumes = useAppSelector((state) =>
        state.resumes.resumeViews.filter(
            (resume) => resume.title === resumeName,
        ),
    );

    const handleResumeSearch = useSearch(SearchParameters.RESUME_NAME);

    const handleRecentlyViewedResumeSearch = useSearch(
        SearchParameters.RECENTLY_VIEWED_RESUME_NAME,
    );

    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton />
            </HomeTopSection>
            <ResumeSection
                name="Recently viewed"
                onHandleSearch={handleRecentlyViewedResumeSearch}
            >
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </ResumeSection>
            <ResumeSection
                name="Users' resume"
                onHandleSearch={handleResumeSearch}
            >
                <ResumeList resumes={resumes} />
            </ResumeSection>
            <TemplateSection name="Templates">
                <TemplateList templates={templates} />
            </TemplateSection>
        </div>
    );
};

export { Home };
