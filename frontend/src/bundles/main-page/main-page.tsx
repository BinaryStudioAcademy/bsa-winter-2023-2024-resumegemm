import { type UserWithProfileRelation } from 'shared/build';

import { getUser } from '../auth/store/actions';
import { Header, NavTabs, Spinner } from '../common/components/components';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '../common/enums/app-route.enum';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '../common/hooks/hooks';
import { Home } from '../home/pages/home';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const getUserAvatart = (user: UserWithProfileRelation | null): string => {
    if (user?.user_profile.avatar) {
        return user.user_profile.avatar;
    }
    return '/src/assets/img/mock-avatar.png';
};

const MainPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user, dataStatus } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            void dispatch(getUser());
        }
    }, [user, dispatch]);

    return (
        <>
            {dataStatus === 'pending' && (
                <div className={styles.spinner_wrapper}>
                    <Spinner />
                </div>
            )}
            <Header>
                <NavTabs items={navbarItems} />
                <UserProfile image={getUserAvatart(user)} />
            </Header>
            <Home />
        </>
    );
};

export { MainPage };
