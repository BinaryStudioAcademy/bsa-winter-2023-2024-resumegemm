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
    type PersonalInformation,
    type Profile,
    type Resume,
    type Review,
    type TechnicalSkill,
    type Template,
    type User,
} from '~/seeds/seed-types/seed-data.type';

import {
    certificationsSeed,
    contactsSeed,
    customSectionSeed,
    educationSeed,
    experienceSeed,
    imagesSeed,
    industriesSeed,
    personalInformationSeed,
    profileSeed,
    resumesSeed,
    reviewsSeed,
    technicalSkillsSeed,
    templatesSeed,
    usersSeed,
} from './seed-data/seed-data.js';

const NUMBER_OF_ROWS = 4;

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
            DatabaseTableName.USERS,
            DatabaseTableName.TEMPLATES,
            DatabaseTableName.USER_TEMPLATES,
            DatabaseTableName.RESUMES,
            DatabaseTableName.REVIEWS,
            DatabaseTableName.CONTACT_DETAILS,
            DatabaseTableName.EDUCATION,
            DatabaseTableName.EXPERIENCE,
            DatabaseTableName.PERSONAL_INFORMATION,
            DatabaseTableName.TECHNICAL_SKILLS,
            DatabaseTableName.RECENTLY_VIEWED,
            DatabaseTableName.INDUSTRIES,
        ];
        await deleteFromTables(trx, tableNames);

        // PROFILE

        const profileMappedSeed = profileSeed.map((profile, index) => ({
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

        // RESUMES
        const resumesMappedSeed = resumesSeed.map((resume, index) => ({
            ...resume,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
            [DatabaseColumnName.IMAGE]: imagesSeed[index].image,
        }));

        const insertedResumes = await trx<Resume>(DatabaseTableName.RESUMES)
            .insert(resumesMappedSeed)
            .returning('*');

        // TEMPLATES
        const templatesMappedSeed = templatesSeed.map((template, index) => ({
            ...template,
            [DatabaseColumnName.ID]: guid.raw(),
            [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
            [DatabaseColumnName.IMAGE]: imagesSeed[index].image,
        }));

        const insertedTemplates = await trx<Template>(
            DatabaseTableName.TEMPLATES,
        )
            .insert(templatesMappedSeed)
            .returning('*');

        // Resume content

        const mapResumeContent = <T>(it: T[]): T[] =>
            it.map((entity, index) => ({
                ...entity,
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.RESUME_ID]: insertedResumes[index].id,
            }));

        await trx<Review>(DatabaseTableName.REVIEWS)
            .insert(mapResumeContent(reviewsSeed))
            .returning('*');

        // EDUCATION

        await trx<Education>(DatabaseTableName.EDUCATION)
            .insert(mapResumeContent(educationSeed))
            .returning('*');

        // CONTACT_DETAILS

        await trx<ContactDetails>(DatabaseTableName.CONTACT_DETAILS)
            .insert(mapResumeContent(contactsSeed))
            .returning('*');

        // EXPERIENCE

        await trx<Experience>(DatabaseTableName.EXPERIENCE)
            .insert(mapResumeContent(experienceSeed))
            .returning('*');

        // // TECHNICAL_SKILLS

        await trx<TechnicalSkill>(DatabaseTableName.TECHNICAL_SKILLS)
            .insert(mapResumeContent(technicalSkillsSeed))
            .returning('*');

        // PERSONAL_INFORMATION

        await trx<PersonalInformation>(DatabaseTableName.PERSONAL_INFORMATION)
            .insert(mapResumeContent(personalInformationSeed))
            .returning('*');

        // CERTIFICATION

        await trx<Certification>(DatabaseTableName.CERTIFICATION)
            .insert(mapResumeContent(certificationsSeed))
            .returning('*');

        // CUSTOM_SECTION

        await trx<CustomSection>(DatabaseTableName.CUSTOM_SECTIONS)
            .insert(mapResumeContent(customSectionSeed))
            .returning('*');

        // USER_TEMPLATES junction table

        const userTemplatesSeed = Array.from({ length: NUMBER_OF_ROWS }).map(
            (_, index) => ({
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
                [DatabaseColumnName.TEMPLATE_ID]: insertedTemplates[index].id,
            }),
        );

        await trx(DatabaseTableName.USER_TEMPLATES)
            .insert(userTemplatesSeed)
            .returning('*');

        //RECENTLY_VIEWED

        const recentlyViewedSeed = Array.from({ length: NUMBER_OF_ROWS }).map(
            (_, index) => ({
                [DatabaseColumnName.ID]: guid.raw(),
                [DatabaseColumnName.USER_ID]: insertedUsers[index].id,
                [DatabaseColumnName.RESUME_ID]: insertedResumes[index].id,
                [DatabaseColumnName.TEMPLATE_ID]: insertedTemplates[index].id,
            }),
        );

        await trx(DatabaseTableName.RECENTLY_VIEWED)
            .insert(recentlyViewedSeed)
            .returning('*');

        // INDUSTRIES

        const industriesMappedSeed = industriesSeed.map((industry) => ({
            ...industry,
            [DatabaseColumnName.ID]: guid.raw(),
        }));

        await trx<Industry>(DatabaseTableName.INDUSTRIES)
            .insert(industriesMappedSeed)
            .returning('*');
    });
}

export { seed };
