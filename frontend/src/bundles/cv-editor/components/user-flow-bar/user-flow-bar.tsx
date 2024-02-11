import { useState } from 'react';

import { UserFlowBtns } from './types/interface';
import css from './user-flow-bar.module.css';

const UserFlow: React.FC = () => {
    const [isActiveStep, setisActiveStep] = useState('personal');

    const buttonArray = Object.keys(UserFlowBtns);

    const onTabClick = (step: string) => (event_: React.MouseEvent) => {
        event_.preventDefault();
        setisActiveStep(step);
    };

    const onNextClick = (array: string[]) => (event_: React.MouseEvent) =>  {
        event_.preventDefault();
        const index = array.indexOf(isActiveStep);
        setisActiveStep(array[index+1]);
        if (index === array.length-1) {
            setisActiveStep('personal');
        }
        //add logic to save fullfilled data and to connect it with progress bar
    };

    return (    
        <section className={css.userFlow}>
            <aside className={css.userFlow__sidebar}>
                <ul className={css.userFlow__sidebarList}>
                    {buttonArray.map((key) => {
                        return (
                        <li key={buttonArray.indexOf(key)} className={css.userFlow__sidebarItem}>
                        <button type='button' onClick={onTabClick(`${key}`)} 
                        className={`${css.userFlow__sidebarBtn} ${key === isActiveStep && css.active}`}>{UserFlowBtns[key]}</button>
                        </li>);
                    })}
                </ul>
                {/* then change div to Progress bar component */}
                <div>Progress bar</div>
            </aside>
            <section className={css.userFlow__output}>
                {/* then change div to form Components */}
                {isActiveStep==='personal' && <div className={css.userFlow__outputMockup}>Personal info</div>}
                {isActiveStep==='experience' && <div className={css.userFlow__outputMockup}>Experience</div>}
                {isActiveStep==='technical' && <div className={css.userFlow__outputMockup}>Technical Skills</div>}
                {isActiveStep==='education' && <div className={css.userFlow__outputMockup}>Education</div>}
                {isActiveStep==='contact' && <div className={css.userFlow__outputMockup}>Contact Information</div>}
                {isActiveStep==='certification' && <div className={css.userFlow__outputMockup}>Certification</div>}
                {/* then change to common Button component */}
                <button type='button' onClick={onNextClick(buttonArray)}  className={css.userFlow__outputBtn}>Next</button>
            </section>
        </section>
    );
};

export { UserFlow };
