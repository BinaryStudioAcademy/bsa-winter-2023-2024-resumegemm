import {
    Header,
    NavTabs,
    UserProfile,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { getUserAvatar } from '~/bundles/common/helpers/get-user-avatar';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { SubscriptionStatus } from '~/bundles/main-page/components/subscription-status/subscription-status';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

const AvatarHeader: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <Header>
            <NavTabs items={navbarItems} />
            <SubscriptionStatus />
            <UserProfile image={getUserAvatar(user)} />
        </Header>
    );
};

export { AvatarHeader };
