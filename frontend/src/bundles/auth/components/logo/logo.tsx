import logo from '~/assets/img/logo.svg';

import styles from './styles.module.scss';

const Logo: React.FC = () => {
  
    return (
        <div className={styles.logo}>
            <img src={logo} alt="logo" />
            <p className={styles.logo__text}>
                You’re on your way to landing your dream job
            </p>
        </div>
    );
};

export { Logo };
