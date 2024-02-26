import mockResume from '~/assets/img/mock-resume.png';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
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

import { loadAllTemplates } from '../store/actions';
import styles from './styles.module.scss';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const templates = useAppSelector((state) => state.templates2.templates);

    useEffect(() => {
        if (user) {
            void dispatch(loadAllTemplates());
        }
    }, [user, dispatch]);

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
