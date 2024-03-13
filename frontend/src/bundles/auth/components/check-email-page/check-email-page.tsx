import clockwise from '~/assets/img/clockwise.png';

import styles from './styles.module.scss';

type CheckEmailProperties = {
    email: string;
};
const CheckEmailPage: React.FC<CheckEmailProperties> = ({
    email,
}): JSX.Element => {
    return (
        <div className={styles.check_email__container}>
            <div className={styles.check_email__image}>
                <img src={clockwise} alt="clock" />
            </div>
            <div className={styles.check_email__header}>
                <h2>Check your inbox</h2>
            </div>
            <p className={styles.check_email__text}>
                We just emailed confirmation link to
                <strong>{email}</strong>
            </p>
            <p className={styles.check_email__text}>
                Click the link, and you will be signed in.
            </p>
        </div>
    );
};

export { CheckEmailPage };
