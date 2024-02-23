import { useCallback, useEffect, useState } from 'react';

import mockResume from '~/assets/img/mock-resume.png';
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
    const [selectedResumeOption, setSelectedResumeOption] = useState<
        number | null
    >(null);
    const [selectedTemplateOption, setSelectedTemplateOption] = useState<
        number | null
    >(null);
    const [selectedRecentlyViewedOption, setSelectedRecentlyViewedOption] =
        useState<number | null>(null);

    const handlerSelectResumesOption = useCallback((option: number) => {
        setSelectedResumeOption(option);
    }, []);

    const handlerSelectTemplateOption = useCallback((option: number) => {
        setSelectedTemplateOption(option);
    }, []);

    const handlerSelectRecentlyViewedOption = useCallback((option: number) => {
        setSelectedRecentlyViewedOption(option);
    }, []);

    const handleSearchUsersResumes = useCallback(() => {
        //get resumes by filter
    }, []);

    useEffect(() => {
        handleSearchUsersResumes();
    }, [selectedResumeOption, handleSearchUsersResumes]);

    return (
        <div className={styles.layout}>
            <HomeTopSection>
                <Greeting />
                <CreateResumeButton />
            </HomeTopSection>
            <ResumeSection
                name="Recently viewed"
                onFilterOptionSelect={handlerSelectRecentlyViewedOption}
            >
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
                <CreateNewCard />
            </ResumeSection>
            <ResumeSection
                onFilterOptionSelect={handlerSelectResumesOption}
                name="Users' resume"
            >
                <ResumeCard
                    title="My Resume"
                    subtitle="Updated - Jan 25"
                    image={mockResume}
                />
            </ResumeSection>
            <TemplateSection
                onFilterOptionSelect={handlerSelectTemplateOption}
                name="Templates"
            >
                <ResumeCard title="My Resume" image={mockResume} />
            </TemplateSection>
        </div>
    );
};

export { Home };
