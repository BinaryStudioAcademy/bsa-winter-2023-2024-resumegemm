import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ResumeModel } from '../../resume.model';

class ContactsModel extends AbstractModel {
    public 'resumeId': string;
    public 'phone': string;
    public 'homeNumber': string;
    public 'address': string;
    public 'socialContact': string;

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
