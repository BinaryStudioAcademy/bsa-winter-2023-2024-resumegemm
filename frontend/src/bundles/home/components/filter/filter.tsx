import { useCallback, useEffect, useState } from 'react';

import filterIcon from '~/assets/img/filter-icon.svg';
import { IconButton } from '~/bundles/common/components/components';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { actions as industriesActionCreator } from '~/bundles/industries/store/index.js';

import styles from './styles.module.scss';

type FilterProperties = {
    onOptionSelect: (option: number) => void;
};

const Filter: React.FC<FilterProperties> = ({ onOptionSelect }) => {
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
    }, [isOpen, handleIndustriesLoad]);

    const toggleDropdown = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleOptionClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>): void => {
            const industryId = +event.currentTarget.id;
            onOptionSelect(industryId);
            toggleDropdown();
        },
        [onOptionSelect, toggleDropdown],
    );

    return (
        <>
            <div className={styles.dropdown}>
                <IconButton
                    onClick={toggleDropdown}
                    className={styles['dropdown__icon-button']}
                >
                    <img src={filterIcon} alt="filter icon" />
                </IconButton>
                {isOpen && (
                    <ul className={styles.dropdown_content}>
                        {industries.map((industry, index) => (
                            <li
                                className={styles.dropdown_content__item}
                                key={index}
                            >
                                <button
                                    id={`${industry.id}`}
                                    onClick={handleOptionClick}
                                >
                                    {industry.industry}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export { Filter };
