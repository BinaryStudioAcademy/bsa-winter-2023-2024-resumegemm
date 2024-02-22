import React, { useCallback, useState } from 'react';

import { LanguageLevels } from '~/bundles/cv-editor/enums/languages-levels.enum';
import { type Language } from '~/bundles/cv-editor/types/languages/languages.type';

import { Dropdown, Input } from '../../../common/components/components';
import { FormGroup } from '../../../common/components/form-group/form-group';
import styles from './styles.module.scss';

const languageOptions = [
    { value: LanguageLevels.BEGINNER, label: LanguageLevels.BEGINNER },
    { value: LanguageLevels.ELEMENTARY, label: LanguageLevels.ELEMENTARY },
    { value: LanguageLevels.INTERMEDIATE, label: LanguageLevels.INTERMEDIATE },
    { value: LanguageLevels.UPPER_INTERMEDIATE, label: LanguageLevels.UPPER_INTERMEDIATE },
    { value: LanguageLevels.ADVANCED, label: LanguageLevels.ADVANCED },
    { value: LanguageLevels.PROFICIENT, label: LanguageLevels.PROFICIENT }
];

type Properties = {
    onSubmit?: () => void
    onChange?: (language: Language) => void
};

const LanguagesForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [languageData, setLanguageData] = useState<Language>({
        title: '',
        level: LanguageLevels.BEGINNER
    });

    const handleInputChange =
        useCallback((event_: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event_.target;

        setLanguageData((previousState) => ({
            ...previousState,
            [name]: value
        }));

        if (onChange) {
            onChange({ ...languageData, [name]: value });
        }
    }, [languageData, onChange]);

    const handleDropdownChange =
        useCallback((value: string | undefined) => {
        if (value !== undefined) {
            setLanguageData((previousState) => ({
                ...previousState,
                level: value as LanguageLevels
            }));
        }
    }, []);

    return (
        <form onSubmit={onSubmit} className={styles.languages}>
            <FormGroup label='Language'>
                <Input
                    placeholder='Text'
                    type='text'
                    name='title'
                    value={languageData.title}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label='Level'>
                <Dropdown
                    name='level'
                    options={languageOptions}
                    onChange={handleDropdownChange}
                />
            </FormGroup>
        </form>
    );
};

export { LanguagesForm };
