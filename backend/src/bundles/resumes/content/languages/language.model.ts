import { type RelationMappings, Model } from 'objection';
import { type LanguageLevels } from 'shared/build/index.js';

import { ResumeModel } from '~/bundles/resumes/resumes.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class LanguageModel extends AbstractModel {
    public 'resumeId': string;
    public 'language': string;
    public 'languageLevel': LanguageLevels;

    public static override get tableName(): typeof DatabaseTableName.LANGUAGES {
        return DatabaseTableName.LANGUAGES;
    }

    public static getRelationMappings(): RelationMappings {
        return {
            resume: {
                relation: Model.BelongsToOneRelation,
                modelClass: ResumeModel,
                join: {
                    from: `${DatabaseTableName.LANGUAGES}.resumeId`,
                    to: `${DatabaseTableName.RESUMES}.id`,
                },
            },
        };
    }
}

export { LanguageModel };
