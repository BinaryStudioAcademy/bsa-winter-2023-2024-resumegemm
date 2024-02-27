import React, { type ChangeEvent, useCallback } from 'react';

import { Calendar } from '../../../common/components/components';
import { FormGroup } from '../../../common/components/form-group/form-group';
import { Input } from '../../../common/components/input/input';
import { type CalendarDate } from '../../../common/types/types';
import styles from './styles.module.scss';

type Experience = {
    jobTitle: string;
    companyName: string;
    country: string;
    city: string;
    description: string;
    startDate: CalendarDate | null;
    endDate: CalendarDate | null;
};

type Properties = {
    onSubmit?: () => void;
    onChange?: (experience: Experience) => void;
};

const ExperienceForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [experience, setExperience] = React.useState<Experience>({
        jobTitle: '',
        companyName: '',
        country: '',
        city: '',
        description: '',
        startDate: null,
        endDate: null,
    });

    const handleInputChange = useCallback(
        (event_: ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event_.target;

            setExperience((previousState) => ({
                ...previousState,
                [name]: value,
            }));

            if (onChange) {
                onChange({ ...experience, [name]: value });
            }
        },
        [onChange, experience],
    );

    return (
        <form className={styles.experience} onSubmit={onSubmit}>
            <FormGroup label={'Job title'}>
                <Input
                    placeholder={'Text'}
                    name={'jobTitle'}
                    value={experience.jobTitle}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Company name'}>
                <Input
                    placeholder={'Text'}
                    name={'companyName'}
                    value={experience.companyName}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Description'}>
                <Input
                    placeholder={'Text'}
                    name={'description'}
                    value={experience.description}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <div className={styles.experience__last_block}>
                <FormGroup label={'City'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'city'}
                        value={experience.city}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup label={'Country'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'country'}
                        value={experience.country}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </div>
            <div className={styles.experience__last_block}>
                <FormGroup label={'Start date'} width={'50%'}>
                    <Calendar
                    // TODO: calendar needs to accept parameters to pre-display the value
                    // also accept the name field to distinguish it from another calendar
                    />
                </FormGroup>
                <FormGroup label={'End date'} width={'50%'}>
                    <Calendar
                    // TODO: calendar needs to accept parameters to pre-display the value
                    // also accept the name field to distinguish it from another calendar
                    />
                </FormGroup>
            </div>
        </form>
    );
};

export { ExperienceForm };
