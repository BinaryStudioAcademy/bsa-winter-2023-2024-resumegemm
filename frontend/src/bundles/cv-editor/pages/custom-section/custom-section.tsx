import React, { type ChangeEvent, useCallback, useState } from 'react';

import { TextArea } from '~/bundles/common/components/components';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { Input } from '~/bundles/common/components/input/input';

import { DateSelector } from '../../components/common/date-selector/date-selector';
import { type CustomData } from '../../types/types';
import styles from './styles.module.scss';

type CustomSectionProperties = {
    onSubmit?: () => void;
    onChange?: (customUserData: CustomData) => void;
};

const CustomSection: React.FC<CustomSectionProperties> = ({
    onSubmit,
    onChange,
}) => {
    const [customData, setCustomData] = useState<CustomData>({
        activityName: '',
        city: '',
        startDate: null,
        endDate: null,
        description: '',
    });
    const handleInputChange = useCallback(
        (
            event:
                | ChangeEvent<HTMLInputElement>
                | ChangeEvent<HTMLTextAreaElement>,
        ): void => {
            const { name, value } = event.target;
            setCustomData((previousState: CustomData) => ({
                ...previousState,
                [name]: value,
            }));

            if (onChange) {
                onChange({ ...customData, [name]: value });
            }
        },
        [customData, onChange],
    );

    const handleDateChange = useCallback(
        (name: string, date: string): void => {
            setCustomData((previousData: CustomData) => ({
                ...previousData,
                [name]: date,
            }));

            if (onChange) {
                onChange({ ...customData, [name]: date });
            }
        },
        [onChange, customData],
    );

    return (
        <form onSubmit={onSubmit} className={styles.custom_section}>
            <FormGroup label={'Activity name, book title, etc.'}>
                <Input
                    placeholder={''}
                    name={'activityName'}
                    value={customData.activityName}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'City'}>
                <Input
                    placeholder={''}
                    name={'city'}
                    value={customData.city}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <div className={styles.custom_section_date}>
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
            <div>
                <FormGroup label={'Description'}>
                    <TextArea
                        placeholder={'description'}
                        name={'description'}
                        value={customData.description}
                        onChange={handleInputChange}
                        className={styles.custom_section__textarea}
                    />
                </FormGroup>
            </div>
        </form>
    );
};

export { CustomSection };
