import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import { ImageModel } from '~/bundles/images/images';
import { UserModel } from '~/bundles/users/users';
import { AbstractModel, DatabaseTableName } from '~/common/database/database';

class ResumeModel extends AbstractModel {
    public 'userId': number;
    public 'imageId': number;
    public 'deletedAt': string;
    public static override get tableName(): typeof DatabaseTableName.RESUMES {
        return DatabaseTableName.RESUMES;
    }
    public static getRelationMappings(): RelationMappings {
        return {
            images: {
                relation: Model.HasOneRelation,
                modelClass: ImageModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.imageId`,
                    to: `${DatabaseTableName.IMAGES}.id`,
                },
            },
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            }
        };
    }
}

export { ResumeModel };
