import { useCallback } from 'react';

import { BaseButton } from '~/bundles/common/components/components';

import styles from './styles.module.scss';

type DropdownItemProperties = {
    optionId: string;
    label: string;
    onOptionSelect: (optionId: string) => void;
};

const DropdownItem: React.FC<DropdownItemProperties> = ({
    optionId,
    label,
    onOptionSelect,
}) => {
    const handleSelectOption = useCallback(() => {
        onOptionSelect(optionId);
    }, [optionId, onOptionSelect]);

    return (
        <li className={styles.dropdown_content__item}>
            <BaseButton onClick={handleSelectOption}>{label}</BaseButton>
        </li>
    );
};

export { DropdownItem };
