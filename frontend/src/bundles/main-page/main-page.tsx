import { getUser } from '../auth/store/actions';
import { Header, NavTabs, Spinner } from '../common/components/components';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '../common/enums/app-route.enum';
import { getUserAvatar } from '../common/helpers/get-user-avatar';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '../common/hooks/hooks';
import { Home } from '../home/pages/home';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

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
                <UserProfile image={getUserAvatar(user)} />
            </Header>
            <Home />
        </>
    );
};

export { MainPage };
