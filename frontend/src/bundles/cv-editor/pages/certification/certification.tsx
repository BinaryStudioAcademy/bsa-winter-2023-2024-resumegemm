import React, { type ChangeEvent, useCallback } from 'react';

import { FormGroup, Input } from '~/bundles/common/components/components';
import { type Certification } from '~/bundles/cv-editor/types/certification/certification.type';

import { DateSelector } from '../../components/common/date-selector/date-selector';
import styles from './styles.module.scss';

type Properties = {
    onSubmit?: () => void;
    onChange?: (certification: Certification) => void;
};

const CertificationForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [certification, setCertification] = React.useState<Certification>({
        title: '',
        authority: '',
        url: '',
        description: '',
        startDate: null,
        endDate: null,
    });
    const handleInputChange = useCallback(
        (event_: ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event_.target;

            const updatedCertification = {
                ...certification,
                [name]: value,
            };
            setCertification(updatedCertification);

            if (onChange) {
                onChange(updatedCertification);
            }
        },
        [certification, onChange],
    );

    const handleDateChange = useCallback(
        (name: string, date: string): void => {
            setCertification((previousData: Certification) => ({
                ...previousData,
                [name]: date,
            }));

            if (onChange) {
                onChange({ ...certification, [name]: date });
            }
        },
        [onChange, certification],
    );

    return (
        <form className={styles.certification} onSubmit={onSubmit}>
            <FormGroup label={'Certification name'}>
                <Input
                    placeholder={'Text'}
                    name={'title'}
                    value={certification.title}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Description'}>
                <Input
                    placeholder={'Text'}
                    name={'description'}
                    value={certification.description}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <div className={styles.certification__last_block}>
                <FormGroup label={'Authority'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'authority'}
                        value={certification.authority}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup label={'Url'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'url'}
                        value={certification.url}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </div>
            <div className={styles.certification__last_block}>
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

export { CertificationForm };
