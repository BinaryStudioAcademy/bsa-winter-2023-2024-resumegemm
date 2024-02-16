import styles from './styles.module.scss';

type Properties = {
    progressPercentage: number;
};

const Progress: React.FC<Properties> = ({ progressPercentage }) => {
    const innerBarStyle = {
        width: `${progressPercentage}%`,
    };

    return (
        <div className={styles.progress}>
            <div className={styles.progress__outerBar}>
                <div
                    className={styles.progress__innerBar}
                    style={{ ...innerBarStyle }}
                ></div>
            </div>
            <div className={styles.progress__percentage}>
                {progressPercentage}%
            </div>
        </div>
    );
};

export { Progress };
