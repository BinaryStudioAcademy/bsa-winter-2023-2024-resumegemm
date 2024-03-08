import { type UpdateUserProfileAndEmailRequestDto } from 'shared/build';

import { PageTitle } from '~/bundles/common/components/page-title/page-title';
import {
    useAppDispatch,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';
import { updateProfileAndEmail } from '~/bundles/profile/store/actions';
import { actions as profileActions } from '~/bundles/profile/store/profile.store';

import { DeleteAccount } from '../components/delete-account/delete-account';
import { ProfileCard } from '../components/profile-card/profile-card';
import { ProfileForm } from '../components/profile-form/profile-form';
import { ProfileInfo } from '../components/profile-info/profile-info';
import { Socials } from '../components/socials/socials';
import { Subscriptions } from '../components/subscription/subscriptions';
import styles from './style.module.scss';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(profileActions.getUserProfileAndSocials());
    }, [dispatch]);

    const handleSocialMediaDisconnect = useCallback(
        (id: string) => {
            void dispatch(profileActions.disconnectSocialMedia(id));
        },
        [dispatch],
    );

    const { profile, id, firstName, lastName, email } = useAppSelector(
        ({ auth, profile }) => ({
            profile,
            firstName: auth.user?.userProfile.firstName as string,
            lastName: auth.user?.userProfile.lastName ?? '',
            email: auth.user?.email as string,
            id: auth.user?.id as string,
        }),
    );

    const handleFormSubmit = useCallback(
        (payload: UpdateUserProfileAndEmailRequestDto) => {
            void dispatch(updateProfileAndEmail({ id, payload }));
        },
        [dispatch, id],
    );

    return (
        <div className={styles.profile}>
            <div className={styles.profile__container}>
                <PageTitle title="Account settings" />
                <ProfileCard title="Your plan">
                    <ProfileInfo />
                </ProfileCard>
                <ProfileCard title="Account">
                    <ProfileForm
                        onSubmit={handleFormSubmit}
                        user={{ email, firstName, lastName }}
                    />
                </ProfileCard>
                <ProfileCard title="Social profile">
                    <Socials
                        socialMediaConnections={profile.socialMediaProfiles}
                        dataStatus={profile.dataStatus}
                        onSocialDisconnect={handleSocialMediaDisconnect}
                    />
                </ProfileCard>
                <ProfileCard title="Email notifications">
                    <Subscriptions />
                </ProfileCard>
                <ProfileCard title="Delete account">
                    <DeleteAccount />
                </ProfileCard>
            </div>
        </div>
    );
};

export { Profile };
