import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import FilterIcon from '~/assets/img/filter-icon.svg?react';
import { BaseButton } from '~/bundles/common/components/components';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { actions as industriesActionCreator } from '~/bundles/industries/store/index.js';

import { DropdownItem } from './components/components';
import styles from './styles.module.scss';

const Filter: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const { industries } = useAppSelector((state) => ({
        industries: state.industries.industries,
    }));

    const handleIndustriesLoad = useCallback(() => {
        void dispatch(industriesActionCreator.getAll());
    }, [dispatch]);

    useEffect(() => {
        handleIndustriesLoad();
    }, [handleIndustriesLoad]);

    const toggleDropdown = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleOptionClick = useCallback((): void => {
        toggleDropdown();
    }, [toggleDropdown]);

    return (
        <>
            <div className={styles.dropdown_wrapper}>
                <div className={styles.dropdown}>
                    <BaseButton
                        onClick={toggleDropdown}
                        className={styles.dropdown__button}
                    >
                        <div
                            className={clsx(
                                styles.button__icon,
                                styles.colored,
                            )}
                        >
                            <FilterIcon />
                        </div>
                    </BaseButton>
                </div>
                {isOpen && (
                    <ul className={styles.dropdown_content}>
                        {industries.map((industry) => (
                            <DropdownItem
                                key={industry.id}
                                label={industry.industry}
                                optionId={industry.id}
                                onOptionSelect={handleOptionClick}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export { Filter };
