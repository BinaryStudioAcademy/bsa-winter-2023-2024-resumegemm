import styles from './style.module.scss';

type Properties = {
    title: string;
};

const PageTitle: React.FC<Properties> = ({ title }) => {
    return (
        <div className={styles.profile__title}>
            <h2>{title}</h2>
        </div>
    );
};

export { PageTitle };

