import React, { type ChangeEvent, useCallback, useState } from 'react';

import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { Input } from '~/bundles/common/components/input/input';
import { type ContactInfo } from '~/bundles/cv-editor/types/contact-info/contact-info.type';

import styles from './styles.module.scss';

type Properties = {
    onSubmit?: () => void;
    onChange?: (contactInfo: ContactInfo) => void;
};

const ContactInfoForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        phoneNumber: '',
        socialLink: '',
    });

    const handleInputChange = useCallback(
        (event_: ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event_.target;

            setContactInfo((previousState) => ({
                ...previousState,
                [name]: value,
            }));

            if (onChange) {
                onChange({ ...contactInfo, [name]: value });
            }
        },
        [contactInfo, onChange],
    );

    return (
        <form onSubmit={onSubmit} className={styles.contact_info}>
            <div className={styles.contact_info__last_block}>
                <FormGroup label={'Phone number'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'phoneNumber'}
                        value={contactInfo.phoneNumber}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup label={'Social link'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'socialLink'}
                        value={contactInfo.socialLink}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </div>
        </form>
    );
};

export { ContactInfoForm };
