import clsx from 'clsx';

import styles from './styles.module.scss';

type FilterIconProperties = {
    className?: string;
};

const FilterIcon: React.FC<FilterIconProperties> = ({ className }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 14 8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(styles.filter__icon, className)}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 0H1.3C0.858172 0 0.5 0.358172 0.5 0.8C0.5 1.24183 0.858172 1.6
                1.3 1.6H12.5C12.9418 1.6 13.3 1.24183 13.3 0.8C13.3 0.358172 12.9418 0 
                12.5 0ZM10.1 3.2H3.7C3.25817 3.2 2.9 3.55817 2.9 4C2.9 4.44183 3.25817 
                4.8 3.7 4.8H10.1C10.5418 4.8 10.9 4.44183 10.9 4C10.9 3.55817 10.5418 
                3.2 10.1 3.2ZM6.1 6.4H7.7C8.14183 6.4 8.5 6.75817 8.5 7.2C8.5 7.64183 
                8.14183 8 7.7 8H6.1C5.65817 8 5.3 7.64183 5.3 7.2C5.3 6.75817 5.65817 
                6.4 6.1 6.4Z"
                fill="#848D96"
            />
        </svg>
    );
};

export { FilterIcon };
