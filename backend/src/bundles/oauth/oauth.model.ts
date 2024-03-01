import { type RelationMappings, Model } from 'objection';

import { ProfileModel } from '~/bundles/profile/profile.model.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type OauthStrategy } from './enums/enums.js';

class OauthModel extends AbstractModel {
    public 'email': string;

    public 'profileId': string;

    public 'oauthStrategy': OauthStrategy;

    public 'oauthId': string;
    public static override get tableName(): typeof DatabaseTableName.OAUTH_USERS {
        return DatabaseTableName.OAUTH_USERS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            user_profile: {
                relation: Model.HasOneRelation,
                modelClass: ProfileModel,
                join: {
                    from: `${DatabaseTableName.OAUTH_USERS}.profileId`,
                    to: `${DatabaseTableName.PROFILE}.id`,
                },
            },
        };
    }
}

export { OauthModel };
