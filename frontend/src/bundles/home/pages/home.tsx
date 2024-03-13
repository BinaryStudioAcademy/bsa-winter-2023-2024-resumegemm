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
    ResumeSection,
    TemplateSection,
} from '~/bundles/home/components/components';

import styles from './styles.module.scss';

type AdaptResumeProperties = {
    id: string;
    image: string;
    title: string;
    resumeTitle?: string;
    createdAt: string;
    updatedAt?: string | undefined;
    deletedAt: string | null;
    userId: string;
    templateId: string;
};

const adaptResume = (resume: AdaptResumeProperties): AdaptResumeProperties => {
    return {
        ...resume,
        title: resume.resumeTitle ?? '',
    };
};

const formatDate = (date: string): string => {
    const unpatedAtDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(unpatedAtDate);
};

const Home: React.FC = () => {
    const { resumes } = useAppSelector((state) => state.resumes);
    const { templates } = useLoadTemplates();
    const { resumeViewHistory } = useLoadViewedResumes();

    const getViewedResumeCount = (resumeId: string): number => {
        return resumeViewHistory[resumeId]?.length || 0;
    };

    const renderResumes = (): JSX.Element[] | null => {
        if (resumes.length === 0) {
            return null;
        }

        return resumes.map((resume) => {
            const adaptedResume = adaptResume(resume.resume);
            const { id, image, title, updatedAt } = adaptedResume;
            const viewedResumeCount = getViewedResumeCount(id);
            let formattedDate = '';
            if (updatedAt) {
                formattedDate = formatDate(updatedAt);
            }
            return (
                <ResumeCard
                    key={id}
                    title={title}
                    image={image}
                    subtitle={`Updated - ${formattedDate}`}
                    viewedResume={viewedResumeCount}
                />
            );
        });
    };

    const renderTemplates = (): JSX.Element[] | null => {
        if (templates.length === 0) {
            return null;
        }

        return templates.map((template) => {
            return (
                <ResumeCard
                    key={template.id}
                    title="My Resume"
                    image={template.image}
                />
            );
        });
    };

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
                {renderResumes()}
            </ResumeSection>
            <TemplateSection name="Templates">
                {renderTemplates()}
            </TemplateSection>
        </div>
    );
};

export { Home };
