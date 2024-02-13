import clsx from 'clsx';

import Arrow2 from '~/assets/img/Arrow 2.png';
import { Button } from '~/bundles/common/components/components';
import { ButtonTheme } from '~/bundles/common/enums/enums';

import introImage from '../../assets/img/5192055.png';
import styles from './styles.module.scss';

const LandingPage = (): JSX.Element => {
    return <div className={styles.landing_page__container}>
        <section className={styles.landing_page__intro}>
            <div className={clsx(styles.landing_page__intro_item, styles.landing_page__intro__content_container)}>
                <div className={styles.intro__content}>
                    <h1 className={styles.intro__title}>
                        <span className={styles.intro__title_highlighted}>
                            Create
                        </span>

                        a career in tech.
                    </h1>

                    <p className={styles.intro__subtitle_text}>
                        The template includes carefully structured sections for personal information, 
                        summary or objective, work experience, education, skills, projects, certifications, 
                        and more. You can easily customize these sections to fit your unique background.
                    </p>

                    <Button label='Create Resume for free' theme={ButtonTheme.BLUE} className={styles.intro__button} />
                    <img className={styles.intro__arrow} src={Arrow2} alt='arrow' />
                </div>
            </div>

            <div className={clsx(styles.intro__photo_container, styles.landing_page__intro_item)}>
                <img className={styles.intro__photo} src={introImage} alt='intro' />
            </div>
        </section>
    </div>;
};

export {
    LandingPage
};
