import { type RelationMappings,Model } from 'objection';

import { ImageModel } from '~/bundles/images/images.js';
import { AbstractModel, DatabaseTableName } from '~/common/database/database.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'username': string;

    public 'recoveryCode': string;

    public 'imageId': number;

    public 'passwordHash': string;

    public 'passwordSalt': string;

    public static override get tableName(): typeof DatabaseTableName.USERS {
        return DatabaseTableName.USERS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            images: {
                relation: Model.HasOneRelation,
                modelClass: ImageModel,
                join: {
                    from: `${DatabaseTableName.USERS}.imageId`,
                    to: `${DatabaseTableName.IMAGES}.id`,
                },
            },
        };
    }
}

export { UserModel };
