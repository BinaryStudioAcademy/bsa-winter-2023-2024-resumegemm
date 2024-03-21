import { Guid as guid } from 'guid-typescript';
import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';
import {
    type Certification,
    type ContactDetails,
    type CustomSection,
    type Education,
    type Experience,
    type Industry,
    type Language,
    type OauthConnection,
    type OauthUser,
    type PersonalInformation,
    type Profile,
    type Resume,
    type ResumeSharedAccess,
    type Review,
    type SubscriptionPlan,
    type TechnicalSkill,
    type Template,
    type User,
} from '~/seeds/seed-types/seed-data.type';

import {
    certificationsSeed,
    contactsSeed,
    customSectionsSeed,
    educationsSeed,
    experiencesSeed,
    imagesSeed,
    industriesSeed,
    languageSeed,
    oauthConnectionSeed,
    oauthUserSeed,
    personalInformationsSeed,
    profilesSeed,
    resumeSharedAccessSeed,
    resumesSeed,
    reviewsSeed,
    subscriptionPlan,
    technicalSkillsSeed,
    templatesSeed,
    usersSeed,
} from './seed-data/seed-data.js';

const NUMBER_OF_ROWS = 4;
const NUMBER_OF_TEMPLATES = templatesSeed.length;

const deleteFromTables = async (
    trx: Knex.Transaction,
    tableNames: string[],
): Promise<void> => {
    for (const tableName of tableNames) {
        await trx(tableName).del();
    }
};

async function seed(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        const tableNames = [
            DatabaseTableName.CERTIFICATION,
            DatabaseTableName.CONTACT_DETAILS,
            DatabaseTableName.CUSTOM_SECTIONS,
            DatabaseTableName.EDUCATION,
            DatabaseTableName.EXPERIENCE,
            DatabaseTableName.LANGUAGES,
            DatabaseTableName.OAUTH_CONNECTIONS,
            DatabaseTableName.OAUTH_USERS,
            DatabaseTableName.PERSONAL_INFORMATION,
            DatabaseTableName.RECENTLY_VIEWED,
            DatabaseTableName.RESUME_SHARE_ACCESS,
            DatabaseTableName.RESUME_SHARE_LINK,
            DatabaseTableName.RESUMES,
            DatabaseTableName.REVIEWS,
            DatabaseTableName.SUBSCRIPTION_PLANS,
            DatabaseTableName.TECHNICAL_SKILLS,
            DatabaseTableName.TEMPLATES,
            DatabaseTableName.PROFILE,
            DatabaseTableName.USER_TEMPLATES,
            DatabaseTableName.USERS,
            DatabaseTableName.INDUSTRIES,
        ];
        await deleteFromTables(trx, tableNames);

        // PROFILE

        const profileMappedSeed = profilesSeed.map((profile, index) => ({
            ...profile,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.AVATAR]: imagesSeed[index].image,
        }));

        const createdProfile = await trx<Profile>(DatabaseTableName.PROFILE)
            .insert(profileMappedSeed)
            .returning('*');

        //USERS
        const usersMappedSeed = usersSeed.map((user, index) => ({
            ...user,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.PROFILE_ID]: createdProfile[index].id,
        }));

        const insertedUsers = await trx<User>(DatabaseTableName.USERS)
            .insert(usersMappedSeed)
            .returning('*');

        // TEMPLATES
        const templatesMappedSeed = templatesSeed.map((template, index) => ({
            ...template,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
        }));

        const insertedTemplates = await trx<Template>(
            DatabaseTableName.TEMPLATES,
        )
            .insert(templatesMappedSeed)
            .returning('*');

        // OAUTH_CONNECTIONS
        const oauthConnectionsMappedSeed = oauthConnectionSeed.map(
            (oauth, index) => ({
                ...oauth,
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
            }),
        );

        await trx<OauthConnection>(DatabaseTableName.OAUTH_CONNECTIONS)
            .insert(oauthConnectionsMappedSeed)
            .returning('*');

        // OAUTH_USERS
        const oauthUsersMappedSeed = oauthUserSeed.map((oauth, index) => ({
            ...oauth,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.PROFILE_ID]: createdProfile[index].id,
        }));

        await trx<OauthUser>(DatabaseTableName.OAUTH_USERS)
            .insert(oauthUsersMappedSeed)
            .returning('*');

        // RESUMES
        const resumesMappedSeed = resumesSeed.map((resume, index) => ({
            ...resume,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
            [DatabaseColumnName.TEMPLATE_ID]: insertedTemplates[index].id,
        }));

        const insertedResumes = await trx<Resume>(DatabaseTableName.RESUMES)
            .insert(resumesMappedSeed)
            .returning('*');

        // Resume content

        const mapResumeContent = <T>(it: T[]): T[] =>
            it.map((entity, index) => ({
                ...entity,
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.RESUME_ID]: insertedResumes[index].id,
            }));

        // REVIEWS
        await trx<Review>(DatabaseTableName.REVIEWS)
            .insert(mapResumeContent(reviewsSeed))
            .returning('*');

        // EDUCATION

        await trx<Education>(DatabaseTableName.EDUCATION)
            .insert(mapResumeContent(educationsSeed))
            .returning('*');

        // CONTACT_DETAILS

        await trx<ContactDetails>(DatabaseTableName.CONTACT_DETAILS)
            .insert(mapResumeContent(contactsSeed))
            .returning('*');

        // EXPERIENCE

        await trx<Experience>(DatabaseTableName.EXPERIENCE)
            .insert(mapResumeContent(experiencesSeed))
            .returning('*');

        // TECHNICAL_SKILLS

        await trx<TechnicalSkill>(DatabaseTableName.TECHNICAL_SKILLS)
            .insert(mapResumeContent(technicalSkillsSeed))
            .returning('*');

        // PERSONAL_INFORMATION

        await trx<PersonalInformation>(DatabaseTableName.PERSONAL_INFORMATION)
            .insert(mapResumeContent(personalInformationsSeed))
            .returning('*');

        // CERTIFICATION

        await trx<Certification>(DatabaseTableName.CERTIFICATION)
            .insert(mapResumeContent(certificationsSeed))
            .returning('*');

        // CUSTOM_SECTION

        await trx<CustomSection>(DatabaseTableName.CUSTOM_SECTIONS)
            .insert(mapResumeContent(customSectionsSeed))
            .returning('*');

        // LANGUAGE

        await trx<Language>(DatabaseTableName.LANGUAGES)
            .insert(mapResumeContent(languageSeed))
            .returning('*');

        // LANGUAGE

        await trx<Language>(DatabaseTableName.LANGUAGES)
            .insert(mapResumeContent(languageSeed))
            .returning('*');

        // USER_TEMPLATES junction table

        const userTemplatesSeed = Array.from({
            length: NUMBER_OF_TEMPLATES,
        }).map((_, index) => ({
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
            [DatabaseColumnName.TEMPLATE_ID]: insertedTemplates[index].id,
        }));

        await trx(DatabaseTableName.USER_TEMPLATES)
            .insert(userTemplatesSeed)
            .returning('*');

        //RECENTLY_VIEWED

        const recentlyViewedSeed = Array.from({ length: NUMBER_OF_ROWS }).map(
            (_, index) => ({
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
                [DatabaseColumnName.RESUME_ID]: insertedResumes[index].id,
                [DatabaseColumnName.TEMPLATE_ID]: insertedTemplates[0].id,
            }),
        );

        await trx(DatabaseTableName.RECENTLY_VIEWED)
            .insert(recentlyViewedSeed)
            .returning('*');

        // INDUSTRIES

        await trx<Industry>(DatabaseTableName.INDUSTRIES)
            .insert(industriesSeed)
            .returning('*');

        // RESUME_SHARE_LINK
        const resumeSharedLinkSeed = Array.from({ length: NUMBER_OF_ROWS }).map(
            (_, index) => ({
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.RESUME_ID]: insertedResumes[index].id,
            }),
        );

        const insertedResumeSharedLInk = await trx(
            DatabaseTableName.RESUME_SHARE_LINK,
        )
            .insert(resumeSharedLinkSeed)
            .returning('*');

        // RESUME_SHARE_ACCESS
        const resumeSharedAccessMappedSeed = resumeSharedAccessSeed.map(
            (resumeSharedAccess, index) => ({
                ...resumeSharedAccess,
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.RESUME_SHARE_LINK_ID]:
                    insertedResumeSharedLInk[index].id,
            }),
        );

        await trx<ResumeSharedAccess>(DatabaseTableName.RESUME_SHARE_ACCESS)
            .insert(resumeSharedAccessMappedSeed)
            .returning('*');

        // SUBSCRIPTION_PLANS
        const subscriptionPlansMappedSeed = subscriptionPlan.map((plan) => ({
            ...plan,
            [DatabaseColumnName.ID]: guid.raw(),
        }));

        await trx<SubscriptionPlan>(DatabaseTableName.SUBSCRIPTION_PLANS)
            .insert(subscriptionPlansMappedSeed)
            .returning('*');
    });
}

export { seed };
