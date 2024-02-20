import clsx from 'clsx';

import { Step } from './step/step';
import styles from './styles.module.scss';

type Properties = {
    steps: { label: string }[];
    activeStep: number;
    indexFontSize?: string;
    labelFontSize?: string;
    className?: string;
};

const Stepper = ({
    steps,
    activeStep,
    indexFontSize = '16px',
    labelFontSize = '16px',
    className = '',
}: Properties): JSX.Element => {
    return (
        <div className={clsx(styles.step, className)}>
            <div
                className={styles.stepper__header}
                style={{ fontSize: indexFontSize }}
            >
                {steps.map(({ label }, index) => {
                    return (
                        <>
                            <Step
                                key={index}
                                label={label}
                                index={index}
                                isActive={index === activeStep}
                                isCompleted={index < activeStep}
                                labelFontSize={labelFontSize}
                            />
                            {index !== steps.length - 1 && (
                                <div className={styles.stepper__line}></div>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export { Stepper };
