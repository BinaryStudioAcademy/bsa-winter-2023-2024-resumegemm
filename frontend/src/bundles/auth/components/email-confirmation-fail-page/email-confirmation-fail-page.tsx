import { Link } from 'react-router-dom';

import { Icon, RegularButton } from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    ButtonSize,
    ButtonVariant,
    ButtonWidth,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

const EmailConfirmationFailPage = (): JSX.Element => {
    return (
        <section className={styles.email_confirmation_fail__section}>
            <div className={styles.email_confirmation_fail__block}>
                <div className={styles.email_confirmation_fail__paragraph}>
                    <h3 className={styles.email_confirmation_fail__title}>
                        Oops! Something went wrong with email confirmation
                    </h3>
                    <p className={styles.email_confirmation_fail__text}>
                        Email confirmation failed. Please sing up again.
                    </p>
                    <p className={styles.email_confirmation_fail__text}>
                        <Link to={AppRoute.SIGN_UP}>
                            <RegularButton
                                className={
                                    styles.email_confirmation_fail__button
                                }
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                width={ButtonWidth.FULL}
                            >
                                Sign Up
                                <Icon
                                    size={IconSize.LARGE}
                                    name={IconName.ARROW_RIGHT}
                                />
                            </RegularButton>
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export { EmailConfirmationFailPage };
