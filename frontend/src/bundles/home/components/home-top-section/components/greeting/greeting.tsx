import { useAppSelector } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

const Greeting: React.FC = () => {
    const firstName = useAppSelector(
        (state) => state.auth.user?.userProfile.firstName,
    );
    return (
        <div className={styles.greeting}>
            <h2 className={styles.greeting__title}>Welcome!</h2>
            <p className={styles.greeting__text}>
                {firstName}, you’re on your way to landing your dream job
            </p>
        </div>
    );
};

export { Greeting };
