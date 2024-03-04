import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class PersonalInformationModel extends AbstractModel {
    public 'resumeId': string;
    public 'firstName': string;
    public 'lastName': string;
    public 'email': string;
    public 'profession': string;
    public 'industry': string;
    public 'city': string;
    public 'country': string;

    public static override get tableName(): typeof DatabaseTableName.PERSONAL_INFORMATION {
        return DatabaseTableName.PERSONAL_INFORMATION;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: PersonalInformationModel,
                join: {
                    from: `${DatabaseTableName.PERSONAL_INFORMATION}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { PersonalInformationModel };
