import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import filterIcon from '~/assets/img/filter-icon.svg';
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
            <div className={styles.dropdown}>
                <div className={styles.dropdown__button}>
                    <BaseButton
                        onClick={toggleDropdown}
                        className={styles.dropdown__icon__button}
                    >
                        <div
                            style={{ maskImage: `url(${filterIcon})` }}
                            className={clsx(styles.mask, styles.colored)}
                        ></div>
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
