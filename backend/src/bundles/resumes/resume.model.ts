import { type RelationMappings, Model } from 'objection';

import { TemplateModel } from '~/bundles/templates/template.model.js';
import { UserModel } from '~/bundles/users/users.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import {
    CertificationModel,
    ContactsModel,
    CustomSectionModel,
    EducationModel,
    ExperienceModel,
    LanguageModel,
    PersonalInformationModel,
    TechnicalSkillModel,
} from './content/content.js';

class ResumeModel extends AbstractModel {
    public 'resumeTitle': string;
    public 'image': string;
    public 'userId': string;
    public 'templateId': string;
    public 'deletedAt': string | null;
    public 'title': string;

    public education?: EducationModel[];
    public experience?: ExperienceModel[];
    public technicalSkills?: TechnicalSkillModel[];
    public contacts?: ContactsModel;
    public personalInformation?: PersonalInformationModel;
    public certification?: CertificationModel[];
    public languages?: LanguageModel[];
    public customSections?: CustomSectionModel[];

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
            certification: {
                relation: Model.HasManyRelation,
                modelClass: CertificationModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.CERTIFICATION}.resumeId`,
                },
            },
            languages: {
                relation: Model.HasManyRelation,
                modelClass: LanguageModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.LANGUAGES}.resumeId`,
                },
            },
            customSections: {
                relation: Model.HasManyRelation,
                modelClass: CustomSectionModel,
                join: {
                    from: `${DatabaseTableName.RESUMES}.id`,
                    to: `${DatabaseTableName.CUSTOM_SECTIONS}.resumeId`,
                },
            },
        };
    }
}

export { ResumeModel };
