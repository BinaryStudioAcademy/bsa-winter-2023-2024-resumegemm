import React, { type ChangeEvent, useCallback, useState } from 'react';

import { Calendar, TextArea } from '~/bundles/common/components/components';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { Input } from '~/bundles/common/components/input/input';
import { type CalendarDate } from '~/bundles/common/types/types';

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

    const handleStartDateChange = useCallback(
        (date: CalendarDate): void => {
            setCustomData((previousData: CustomData) => ({
                ...previousData,
                startDate: date,
            }));

            if (onChange) {
                onChange({ ...customData, startDate: date });
            }
        },
        [customData, onChange],
    );

    const handleEndDateChange = useCallback(
        (date: CalendarDate): void => {
            setCustomData((previousState: CustomData) => ({
                ...previousState,
                endDate: date,
            }));

            if (onChange) {
                onChange({ ...customData, endDate: date });
            }
        },
        [customData, onChange],
    );

    return (
        <form onSubmit={onSubmit} className={styles.custom__section}>
            <div className={styles.custom__section__activity}>
                <FormGroup
                    label={'Activity name, book title, etc.'}
                    width={'45%'}
                >
                    <Input
                        placeholder={''}
                        name={'activityName'}
                        value={customData.activityName}
                        onChange={handleInputChange}
                        className={styles.custom__section__input}
                    />
                </FormGroup>
                <FormGroup label={'City'} width={'45%'}>
                    <Input
                        placeholder={''}
                        name={'city'}
                        value={customData.city}
                        onChange={handleInputChange}
                        className={styles.custom__section__input}
                    />
                </FormGroup>
            </div>
            <div className={styles.custom__section__date}>
                <FormGroup label={'Start date'}>
                    <Calendar
                        className={styles.custom__section__calendar}
                        onChange={handleStartDateChange}
                    />
                </FormGroup>
                <FormGroup label={'End date'}>
                    <Calendar
                        className={styles.custom__section__calendar}
                        onChange={handleEndDateChange}
                    />
                </FormGroup>
            </div>
            <div>
                <FormGroup label={'Description'}>
                    <TextArea
                        placeholder={'description'}
                        name={'description'}
                        value={customData.description}
                        onChange={handleInputChange}
                        className={styles.custom__section__textarea}
                    />
                </FormGroup>
            </div>
        </form>
    );
};

export { CustomSection };
