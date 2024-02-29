import { getUser } from '../auth/store/actions';
import { Header, NavTabs } from '../common/components/components';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '../common/enums/app-route.enum';
import { getUserAvatart } from '../common/helpers/get-user-avatar';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '../common/hooks/hooks';
import { Templates } from '../home/pages/templates';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

const TemplatePage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            void dispatch(getUser());
        }
    }, [user, dispatch]);

    return (
        <>
            <Header>
                <NavTabs items={navbarItems} />
                <UserProfile image={getUserAvatart(user)} />
            </Header>
            <Templates />
        </>
    );
};

export { TemplatePage };
