import {
    type OauthConnectionEntityFields,
    type SocialMediaProfiles,
} from '~/bundles/users/users';

type getCurrentlyConnectedPayload = {
    socialMediaProfiles: SocialMediaProfiles[];
    oauthConnections: OauthConnectionEntityFields[];
};

const getCurrentlyConnectedSocialMedias = ({
    socialMediaProfiles,
    oauthConnections,
}: getCurrentlyConnectedPayload): SocialMediaProfiles[] => {
    return socialMediaProfiles.map((socialProfile) => {
        const foundConnections = oauthConnections.find(
            (connection) => connection.oauthStrategy === socialProfile.provider,
        );
        if (foundConnections) {
            return {
                ...socialProfile,
                id: foundConnections.id,
                connected: true,
            };
        }

        return socialProfile;
    });
};

export { getCurrentlyConnectedSocialMedias };
