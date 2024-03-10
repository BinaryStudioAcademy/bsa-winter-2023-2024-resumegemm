import { DataStatus } from '~/bundles/common/enums/enums';
import { SpinnerVariant } from '~/bundles/common/enums/spinner/spinner-variant.enum';

import { Header, NavTabs, Spinner } from '../common/components/components';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '../common/enums/app-route.enum';
import { getUserAvatar } from '../common/helpers/get-user-avatar';
import { useAppSelector } from '../common/hooks/hooks';
import { Home } from '../home/pages/home';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

const MainPage = (): JSX.Element => {
    const { user, dataStatus } = useAppSelector((state) => state.auth);

    return (
        <>
            {dataStatus === DataStatus.PENDING && (
                <div className={styles.spinner_wrapper}>
                    <Spinner variant={SpinnerVariant.MEDIUM} />
                </div>
            )}
            <Header>
                <NavTabs items={navbarItems} />
                <UserProfile image={getUserAvatar(user)} />
            </Header>
            <Home />
        </>
    );
};

export { MainPage };
