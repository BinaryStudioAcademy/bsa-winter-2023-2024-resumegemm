import { type RelationMappings, Model } from 'objection';

import { ProfileModel } from '~/bundles/profile/profile.model.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type OauthStrategy } from './enums/enums.js';

class OauthModel extends AbstractModel {
    public 'email': string;

    public 'userId': string;

    public 'oauthStrategy': OauthStrategy;

    public 'oauthId': string;

    public static override get tableName(): typeof DatabaseTableName.OAUTH_CONNECTIONS {
        return DatabaseTableName.OAUTH_CONNECTIONS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            userProfile: {
                relation: Model.HasOneRelation,
                modelClass: ProfileModel,
                join: {
                    from: `${DatabaseTableName.OAUTH_CONNECTIONS}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
        };
    }
}

export { OauthModel };
