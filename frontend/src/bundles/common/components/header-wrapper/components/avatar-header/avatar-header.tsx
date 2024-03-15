import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { getUserAvatar } from '~/bundles/common/helpers/get-user-avatar';
import { useAppSelector } from '~/bundles/common/hooks/hooks';

import { Header, NavTabs } from '../../../components';
import { UserProfile } from '../../../layout/header/user-profile/user-profile';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

const AvatarHeader: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <>
            <Header>
                <NavTabs items={navbarItems} />
                <UserProfile image={getUserAvatar(user)} />
            </Header>
        </>
    );
};

export { AvatarHeader };
