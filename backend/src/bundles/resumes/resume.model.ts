import { type RelationMappings, Model } from 'objection';

import { TemplateModel } from '~/bundles/templates/template.model.js';
import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import {
    ContactsModel,
    EducationModel,
    ExperienceModel,
    PersonalInformationModel,
    TechnicalSkillModel,
} from './content/content';

class ResumeModel extends AbstractModel {
    public 'resumeTitle': string;
    public 'image': string;
    public 'userId': string;
    public 'templateId': string;
    public 'deletedAt': string | null;

    public education?: EducationModel[];
    public experience?: ExperienceModel[];
    public technicalSkills?: TechnicalSkillModel[];
    public contacts?: ContactsModel;
    public personalInformation?: PersonalInformationModel;

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
            templates: {
                relation: Model.HasOneRelation,
                modelClass: TemplateModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.templateId`,
                    to: `${DatabaseTableName.TEMPLATES}.id`,
                },
            },
            education: {
                relation: Model.HasManyRelation,
                modelClass: EducationModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.EDUCATION}.resumeId`,
                },
            },
            experience: {
                relation: Model.HasManyRelation,
                modelClass: ExperienceModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.EXPERIENCE}.resumeId`,
                },
            },
            technicalSkills: {
                relation: Model.HasManyRelation,
                modelClass: TechnicalSkillModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.TECHNICAL_SKILLS}.resumeId`,
                },
            },
            contacts: {
                relation: Model.HasOneRelation,
                modelClass: ContactsModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.CONTACT_DETAILS}.resumeId`,
                },
            },
            personalInformation: {
                relation: Model.HasOneRelation,
                modelClass: PersonalInformationModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.PERSONAL_INFORMATION}.resumeId`,
                },
            },
        };
    }
}

export { ResumeModel };
