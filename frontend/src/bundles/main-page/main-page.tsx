import { DataStatus } from '~/bundles/common/enums/enums';
import { SpinnerVariant } from '~/bundles/common/enums/spinner/spinner-variant.enum';

import { Spinner } from '../common/components/components';
import { useAppSelector } from '../common/hooks/hooks';
import { Home } from '../home/pages/home';
import styles from './styles.module.scss';

const MainPage = (): JSX.Element => {
    const { dataStatus } = useAppSelector((state) => state.auth);

    return (
        <>
            {dataStatus === DataStatus.PENDING && (
                <div className={styles.spinner_wrapper}>
                    <Spinner variant={SpinnerVariant.MEDIUM} />
                </div>
            )}
            <Home />
        </>
    );
};

export { MainPage };
