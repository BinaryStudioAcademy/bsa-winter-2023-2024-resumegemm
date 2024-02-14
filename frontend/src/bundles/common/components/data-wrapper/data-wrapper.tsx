import { type FC } from 'react';

import { type DataWrapperProperties } from '~/bundles/common/types/data-wrapper/data-wrapper-properties.type';

import styles from './styles.module.scss';

const DataWrapper: FC<DataWrapperProperties> = ({
    isLoading,
    hasData,
    children,
    customSpinnerElement,
    customMessageElement
}) => {
    const defaultSpinnerElement =
        <div className={styles.data_wrapper__spinner}></div>;

    const defaultMessageElement =
        <h2 className={styles.data_wrapper__message}>
            There is no data available. Please, try again later.
        </h2>;

    if (isLoading) {
        return (
            <div className={styles.data_wrapper__container}>
            {customSpinnerElement ?? defaultSpinnerElement}
            </div>
        );
    }
    if (!hasData) {
        return (
            <div className={styles.data_wrapper__container}>
                {customMessageElement ?? defaultMessageElement}
            </div>
        );
    }
    return <>{children}</>;
};

export { DataWrapper };
