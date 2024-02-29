import React, { type ChangeEvent, useCallback, useState } from 'react';

import { FormGroup, Input } from '~/bundles/common/components/components';
import { type Education } from '~/bundles/cv-editor/types/education/education.type';

import { DateSelector } from '../../components/common/date-selector/date-selector';
import styles from './styles.module.scss';

type Properties = {
    onSubmit?: () => void;
    onChange?: (education: Education) => void;
};

const EducationForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [education, setEducation] = useState<Education>({
        institutionName: '',
        degree: '',
        city: '',
        country: '',
        description: '',
        startDate: null,
        endDate: null,
    });
    const handleInputChange = useCallback(
        (event_: ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event_.target;

            setEducation((previousState) => ({
                ...previousState,
                [name]: value,
            }));

            if (onChange) {
                onChange({ ...education, [name]: value });
            }
        },
        [education, onChange],
    );

    const handleDateChange = useCallback(
        (name: string, date: string): void => {
            setEducation((previousData: Education) => ({
                ...previousData,
                [name]: date,
            }));

            if (onChange) {
                onChange({ ...education, [name]: date });
            }
        },
        [onChange, education],
    );

    return (
        <form onSubmit={onSubmit} className={styles.education}>
            <FormGroup label={'Institution name'}>
                <Input
                    placeholder={'Text'}
                    name={'institutionName'}
                    value={education.institutionName}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Degree'}>
                <Input
                    placeholder={'Text'}
                    name={'degree'}
                    value={education.degree}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Description'}>
                <Input
                    placeholder={'Text'}
                    name={'description'}
                    value={education.description}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <div className={styles.education__last_block}>
                <FormGroup label={'City'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'city'}
                        value={education.city}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup label={'Country'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'country'}
                        value={education.country}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </div>
            <div className={styles.education__last_block}>
                <DateSelector
                    name={'startDate'}
                    label={'Start Date'}
                    onChange={handleDateChange}
                />
                <DateSelector
                    name={'endDate'}
                    label={'End Date'}
                    onChange={handleDateChange}
                />
            </div>
        </form>
    );
};

export { EducationForm };
