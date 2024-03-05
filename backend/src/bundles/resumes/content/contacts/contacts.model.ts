import { type RelationMappings, Model } from 'objection';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ContactsModel extends AbstractModel {
    public 'resumeId': string;
    public 'phoneNumber': string;
    public 'socialContact': string;
    public 'link': string;

    public static override get tableName(): typeof DatabaseTableName.CONTACT_DETAILS {
        return DatabaseTableName.CONTACT_DETAILS;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.CONTACT_DETAILS}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { ContactsModel };
