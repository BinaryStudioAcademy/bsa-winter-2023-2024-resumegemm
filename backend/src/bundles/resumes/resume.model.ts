import { type RelationMappings, Model } from 'objection';

import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ResumeModel extends AbstractModel {
    public 'userId': number;
    public 'image': string;
    public 'deletedAt': string;
    public static override get tableName(): typeof DatabaseTableName.RESUMES {
        return DatabaseTableName.RESUMES;
    }
    public static getRelationMappings(): RelationMappings {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
            },
        };
    }
}

export { ResumeModel };
