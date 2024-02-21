import { type FC, type ReactNode } from 'react';

import { Spinner } from '~/bundles/common/components/components';
import { type DataWrapperProperties } from '~/bundles/common/types/data-wrapper/data-wrapper-properties.type';

import styles from './styles.module.scss';

const DataWrapper: FC<DataWrapperProperties> = ({
    isLoading,
    hasData,
    children,
    CustomSpinnerComponent,
    CustomMessageComponent,
}) => {
    const defaultMessageElement: ReactNode = (
        <h2 className={styles.data_wrapper__message}>
            There is no data available. Please, try again later.
        </h2>
    );

    if (isLoading) {
        return (
            <div className={styles.data_wrapper__container}>
                {CustomSpinnerComponent ?? <Spinner />}
            </div>
        );
    }
    if (!hasData && hasData !== undefined) {
        return (
            <div className={styles.data_wrapper__container}>
                {CustomMessageComponent ?? defaultMessageElement}
            </div>
        );
    }
    return <>{children}</>;
};

export { DataWrapper };
