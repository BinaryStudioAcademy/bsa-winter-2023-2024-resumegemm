import clsx from 'clsx';

import introImage from '~/assets/img/5192055.png';
import templateThirdImage from '~/assets/img/5297769.png';
import templateSecondImage from '~/assets/img/6450724.png';
import GettingStarted from '~/assets/img/get-started.png';
import OnlineEditorFeatureImage from '~/assets/img/mock-resume-designer.png';
import templateFirstImage from '~/assets/img/resume-template.png';
import {
    AppRoute,
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/enums/enums';

import { RegularButton } from '../common/components/components';
import { useCallback, useNavigate } from '../common/hooks/hooks';
import { FeatureImage } from './components/feature-image';
import styles from './styles.module.scss';

const LandingPage = (): JSX.Element => {
    const navigate = useNavigate();

    const handleGetStarted = useCallback(() => {
        navigate(AppRoute.LOG_IN);
    }, [navigate]);

    return (
        <>
            <div className={styles.landing_page__container}>
                <section className={styles.landing_page__intro}>
                    <div
                        className={clsx(
                            styles.landing_page__intro_item,
                            styles.landing_page__intro__content_container,
                        )}
                    >
                        <div className={styles.intro__content}>
                            <h1 className={styles.intro__title}>
                                <span
                                    className={styles.intro__title_highlighted}
                                >
                                    Create
                                </span>
                                a career in tech.
                            </h1>

                            <p className={styles.intro__subtitle_text}>
                                The template includes carefully structured
                                sections for personal information, summary or
                                objective, work experience, education, skills,
                                projects, certifications, and more. You can
                                easily customize these sections to fit your
                                unique background.
                            </p>

                            <RegularButton
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                className={styles.intro__button}
                                onClick={handleGetStarted}
                            >
                                <p>Create Resume for free</p>
                            </RegularButton>
                            <div className={styles.intro__arrow}></div>
                        </div>
                    </div>

                    <div
                        className={clsx(
                            styles.intro__image_container,
                            styles.landing_page__intro_item,
                        )}
                    >
                        <img
                            className={styles.intro__image}
                            src={introImage}
                            alt="intro"
                        />
                    </div>
                </section>

                <section className={styles.landing_page__features}>
                    <div className={styles.features__image_container_left}>
                        <div
                            className={
                                styles.landing_page__template_feature_image_container
                            }
                        >
                            <FeatureImage
                                src={templateFirstImage}
                                label="PHP developer"
                            />
                            <FeatureImage
                                src={templateSecondImage}
                                label="PHP developer"
                            />
                            <FeatureImage
                                src={templateThirdImage}
                                label="PHP developer"
                            />
                        </div>
                    </div>

                    <div className={styles.features__content_container_right}>
                        <h2 className={styles.features__title}>Features</h2>

                        <h3 className={styles.features__subtitle}>Templates</h3>

                        <p className={styles.features__text}>
                            A variety of pre-designed and customizable resume
                            templates catering to different industries, roles,
                            and design preferences.
                        </p>
                    </div>

                    <div className={styles.features__content_container_left}>
                        <h2 className={styles.features__title}>Features</h2>

                        <h3 className={styles.features__subtitle}>
                            Online Editor
                        </h3>

                        <p className={styles.features__text}>
                            Ability to customize templates by changing colors,
                            layouts, and adding personal branding elements,
                            drag-and-drop functionality to rearrange sections
                            and content blocks.
                        </p>
                    </div>

                    <div className={styles.features__image_container_right}>
                        <img
                            className={
                                styles.features__online_editor_feature_image
                            }
                            src={OnlineEditorFeatureImage}
                            alt="online editor feature"
                        />
                    </div>
                </section>

                <section className={styles.landing_page__get_started_section}>
                    <div className={styles.landing_page__get_started_item}>
                        <div
                            className={
                                styles.get_started_section__content_container
                            }
                        >
                            <h2 className={styles.get_started_section__title}>
                                Start the
                                <br />
                                ResumeGemm
                            </h2>

                            <p className={styles.get_started_section__text}>
                                We`re thrilled to welcome you to the ResumeGemm
                                family, where your journey to crafting
                                exceptional resumes begins!
                            </p>

                            <RegularButton
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                className={styles.get_started_section__button}
                                onClick={handleGetStarted}
                            >
                                <p>Create Resume for free</p>
                            </RegularButton>
                        </div>
                    </div>

                    <div
                        className={clsx(
                            styles.get_started_section__image_container,
                            styles.landing_page__get_started_item,
                        )}
                    >
                        <img
                            className={styles.get_started_section__image}
                            src={GettingStarted}
                            alt="get started"
                        />
                    </div>
                </section>
            </div>
        </>
    );
};

export { LandingPage };
