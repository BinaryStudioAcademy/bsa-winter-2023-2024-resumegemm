import { Step } from './step/step';
import styles from './styles.module.scss';

type Properties = {
    steps: { label: string }[];
    activeStep: number;
};

const Stepper = ({ steps, activeStep }: Properties): JSX.Element => {
    return (
        <div className={styles.stepper}>
            <div className={styles.stepper__header}>
                {steps.map(({ label }, index) => {
                    return (
                        <>
                            <Step
                                key={index}
                                label={label}
                                index={index}
                                isActive={index === activeStep}
                                isCompleted={index < activeStep}
                            />
                            {index !== steps.length -1 &&(<div className={styles.stepper__line}></div>)}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export { Stepper };
