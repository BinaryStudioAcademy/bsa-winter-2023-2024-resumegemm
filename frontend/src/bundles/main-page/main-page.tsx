import { Header, NavTabs } from '../common/components/components';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile';
import { AppRoute } from '../common/enums/app-route.enum';
import { Home } from '../home/pages/home';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const MainPage = (): JSX.Element => {
    return (
        <>
            <Header>
                <NavTabs items={navbarItems} />
                <UserProfile image="/src/assets/img/mock-avatar.png" />
            </Header>
            <Home />
        </>
    );
};

export { MainPage };
