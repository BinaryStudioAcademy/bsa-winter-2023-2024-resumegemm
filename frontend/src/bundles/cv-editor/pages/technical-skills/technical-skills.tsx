import React, { useCallback, useState } from 'react';

import { TechnicalSkillLevel } from '~/bundles/cv-editor/enums/technical-skills.enum';
import { type TechnicalSkill } from '~/bundles/cv-editor/types/technical-skills/technical-skills.type';

import { Dropdown, Input } from '../../../common/components/components';
import { FormGroup } from '../../../common/components/form-group/form-group';
import styles from './styles.module.scss';

const technicalSkillsOptions = [
    {
        value: TechnicalSkillLevel.BEGINNER,
        label: TechnicalSkillLevel.BEGINNER,
    },
    {
        value: TechnicalSkillLevel.EXPERIENCED,
        label: TechnicalSkillLevel.EXPERIENCED,
    },
    { value: TechnicalSkillLevel.EXPERT, label: TechnicalSkillLevel.EXPERT },
];

type Properties = {
    onSubmit?: () => void;
    onChange?: (technicalSkill: TechnicalSkill) => void;
};

const TechnicalSkillsForm: React.FC<Properties> = ({ onSubmit, onChange }) => {
    const [technicalSkill, setTechnicalSkill] = useState<TechnicalSkill>({
        title: '',
        level: TechnicalSkillLevel.BEGINNER,
    });

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setTechnicalSkill((previousState) => ({
                ...previousState,
                [name]: value,
            }));

            if (onChange) {
                onChange({ ...technicalSkill, [name]: value });
            }
        },
        [technicalSkill, onChange],
    );

    const handleDropdownChange = useCallback(
        (value: string | undefined) => {
            if (value) {
                setTechnicalSkill((previousState) => ({
                    ...previousState,
                    level: value as TechnicalSkillLevel,
                }));

                if (onChange) {
                    onChange({
                        ...technicalSkill,
                        level: value as TechnicalSkillLevel,
                    });
                }
            }
        },
        [technicalSkill, onChange],
    );

    return (
        <form onSubmit={onSubmit} className={styles.technical_skills}>
            <FormGroup label="Skill name">
                <Input
                    placeholder="Text"
                    type="text"
                    name="title"
                    value={technicalSkill.title}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <FormGroup label="Level">
                <Dropdown
                    name="level"
                    options={technicalSkillsOptions}
                    onChange={handleDropdownChange}
                />
            </FormGroup>
        </form>
    );
};

export { TechnicalSkillsForm };
