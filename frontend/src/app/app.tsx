import reactLogo from '~/assets/img/react.svg';
import { getUser } from '~/bundles/auth/store/actions';
import { Link, RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { users, dataStatus } = useAppSelector(({ users }) => ({
        users: users.users,
        dataStatus: users.dataStatus,
    }));
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    useEffect(() => {
        void dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <img src={reactLogo} className="App-logo" width="30" alt="logo" />
            <ul className="App-navigation-list">
                <li>
                    <Link to={AppRoute.ROOT}>Root</Link>
                </li>
                {!user && (
                    <>
                        <li>
                            <Link to={AppRoute.SIGN_IN}>Sign in</Link>
                        </li>
                        <li>
                            <Link to={AppRoute.SIGN_UP}>Sign up</Link>
                        </li>
                    </>
                )}
            </ul>
            <p>Current path: {pathname}</p>

            <div>
                <RouterOutlet />
            </div>
            {isRoot && (
                <>
                    <h2>Users:</h2>
                    <h3>Status: {dataStatus}</h3>
                    <ul>
                        {users.map((it) => (
                            <li key={it.id}>{it.email}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export { App };
