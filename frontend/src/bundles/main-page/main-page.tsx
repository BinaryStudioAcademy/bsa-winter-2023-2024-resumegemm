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
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 100,
                    }}
                >
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
