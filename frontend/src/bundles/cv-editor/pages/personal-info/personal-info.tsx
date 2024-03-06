import React, { type ChangeEvent, useCallback } from 'react';

import { Input } from '../../../common/components/components';
import { FormGroup } from '../../../common/components/form-group/form-group';
import { type PersonalInfo } from '../../types/personal-info/personal-info.type';
import styles from './styles.module.scss';

type Properties = {
    onSubmit?: () => void;
    onChange?: (personalInfo: PersonalInfo) => void;
};

const PersonalInfoForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo>({
        fullName: '',
        address: '',
        city: '',
        country: '',
        email: '',
        profession: '',
    });

    const handleInputChange = useCallback(
        (event_: ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event_.target;

            setPersonalInfo((previousState) => ({
                ...previousState,
                [name]: value,
            }));

            if (onChange) {
                onChange({ ...personalInfo, [name]: value });
            }
        },
        [onChange, personalInfo],
    );

    return (
        <form className={styles.personal_info} onSubmit={onSubmit}>
            <FormGroup label={'Full Name'}>
                <Input
                    placeholder={'Text'}
                    name={'fullName'}
                    value={personalInfo.fullName}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Email'}>
                <Input
                    placeholder={'Text'}
                    name={'email'}
                    value={personalInfo.email}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Profession'}>
                <Input
                    placeholder={'Text'}
                    name={'profession'}
                    value={personalInfo.profession}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label={'Address'}>
                <Input
                    placeholder={'Text'}
                    name={'address'}
                    value={personalInfo.address}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <div className={styles.personal_info__last_block}>
                <FormGroup label={'City'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'city'}
                        value={personalInfo.city}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup label={'Country'} width={'50%'}>
                    <Input
                        placeholder={'Text'}
                        name={'country'}
                        value={personalInfo.country}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </div>
        </form>
    );
};

export { PersonalInfoForm };
