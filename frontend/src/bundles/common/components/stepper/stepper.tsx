import clsx from 'clsx';

import { Step } from './step/step';
import styles from './styles.module.scss';

type Properties = {
    steps: { label: string }[];
    activeStep: number;
    className?: string;
};

const Stepper = ({
    steps,
    activeStep,
    className = '',
}: Properties): JSX.Element => {
    return (
        <div className={clsx(styles.stepper, className)}>
            {steps.map(({ label }, index) => {
                return (
                    <div className={styles.wrapper} key={index}>
                        <Step
                            
                            label={label}
                            index={index}
                            isActive={index === activeStep}
                            isCompleted={index < activeStep}
                        />
                        {index !== steps.length - 1 && (
                            <div className={styles.stepper__line}></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export { Stepper };
