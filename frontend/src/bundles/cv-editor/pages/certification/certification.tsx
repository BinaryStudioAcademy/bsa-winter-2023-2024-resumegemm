import React, { type ChangeEvent, useCallback } from 'react';

import { Calendar } from '~/bundles/common/components/calendar/calendar';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { Input } from '~/bundles/common/components/input/input';
import { type Certification } from '~/bundles/cv-editor/types/certification/certification.type';

import styles from './styles.module.scss';

type Properties = {
    onSubmit?: () => void
    onChange?: (certification: Certification) => void
};

const CertificationForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [certification, setCertification] = React.useState<Certification>({
        title: '',
        authority: '',
        url: '',
        description: '',
        startDate: null,
        endDate: null
    });

    const handleInputChange =
        useCallback((event_: ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event_.target;

            const updatedCertification = ({
                ...certification,
                [name]: value
            });
            setCertification(updatedCertification);

            if (onChange) {
                onChange(updatedCertification);
            }
        }, [certification, onChange]);

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

export { CertificationForm };
