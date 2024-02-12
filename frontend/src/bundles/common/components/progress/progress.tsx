import styles from './styles.module.scss';

type Properties = {
    fillPercent: number;
};

const Progress: React.FC<Properties> = ({ fillPercent }) => {
    // sets valid fill percent in range between 0 and 100
    const validFillPercent: number = Math.min(100, Math.max(0, fillPercent));
    // removes right side border radius when a fill percent lower than 95%
    const innerFillBorderRadius: string =
        validFillPercent > 95 ? '16px' : '16px 0 0 16px';
    // extra styling for filling element
    const innerFillStyle = {
        width: `${validFillPercent}%`,
        borderRadius: innerFillBorderRadius,
    };

    return (
        <div className={styles.progress}>
            <div className={styles.progress__outerFill}>
                <div className={styles.progress__innerFill} style={{ ...innerFillStyle }}></div>
            </div>
            <div className={styles.progress__percent}>{validFillPercent}%</div>
        </div>
    );
};

export { Progress };
