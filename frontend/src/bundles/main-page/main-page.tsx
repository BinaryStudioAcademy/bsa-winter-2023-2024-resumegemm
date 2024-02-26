import { signIn } from '../auth/store/actions';
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

const MainPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user, dataStatus } = useAppSelector((state) => state.auth);

    useEffect(() => {
        void dispatch(
            signIn({ email: 'gbottoms1@arizona.edu', password: 'pxlxvUyyUjE' }),
        );
    }, [dispatch]);

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
                <UserProfile
                    image={
                        user
                            ? user.user_profile.avatar
                            : '/src/assets/img/mock-avatar.png'
                    }
                />
            </Header>
            <Home />
        </>
    );
};

export { MainPage };
