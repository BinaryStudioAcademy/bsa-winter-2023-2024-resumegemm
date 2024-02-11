import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

import {
    contactsSeed,
    educationSeed,
    experienceSeed,
    personalInformationSeed,
    resumesSeed,
    reviewsSeed,
    technicalSkillsSeed,
    templatesSeed,
    userImagesSeed,
    usersSeed,
} from './seed-data/seed-data';
import {
    type ContactDetails,
    type Education,
    type Experience,
    type Image,
    type PersonalInformation,
    type Resume,
    type Review,
    type SaveImageDto,
    type TechnicalSkill,
    type Template,
    type User,
} from './seed-types/seed-data.type';

const getRandomIndex = (length: number): number => {
    return Math.floor(Math.random() * length);
};

const mapImageSources = (images: SaveImageDto[]): string[] => {
    return images.map((image) => image.image_source);
};

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
            DatabaseTableName.RESUMES,
            DatabaseTableName.IMAGES,
            DatabaseTableName.REVIEWS,
            DatabaseTableName.CONTACT_DETAILS,
            DatabaseTableName.EDUCATION,
            DatabaseTableName.EXPERIENCE,
            DatabaseTableName.PERSONAL_INFORMATION,
            DatabaseTableName.TECHNICAL_SKILLS,
            DatabaseTableName.RECENTLY_VIEWED,
        ];
        await deleteFromTables(trx, tableNames);

        await trx(DatabaseTableName.IMAGES).insert([...userImagesSeed]);

        const userImages = await trx<Image>(DatabaseTableName.IMAGES)
            .select('id')
            .whereIn('image_source', mapImageSources(userImagesSeed));

        //USERS
        const usersMappedSeed = usersSeed.map((user, index) => ({
            ...user,
            [DatabaseColumnName.IMAGE_ID]: userImages[index]
                ? userImages[index].id
                : null,
        }));

        const insertedUsers = await trx<User>(DatabaseTableName.USERS)
            .insert(usersMappedSeed)
            .returning('*');

        // RESUMES
        const resumesMappedSeed = resumesSeed.map((resume, index) => ({
            ...resume,
            [DatabaseColumnName.USER_ID]:
                insertedUsers[getRandomIndex(insertedUsers.length)].id,
            [DatabaseColumnName.IMAGE_ID]: userImages[index]
                ? userImages[index].id
                : null,
        }));

        const insertedResumes = await trx<Resume>(DatabaseTableName.RESUMES)
            .insert(resumesMappedSeed)
            .returning('*');

        // TEMPLATES
        const templatesMappedSeed = templatesSeed.map((template, index) => ({
            ...template,
            [DatabaseColumnName.USER_ID]:
                insertedUsers[getRandomIndex(insertedUsers.length)].id,
            [DatabaseColumnName.RESUME_ID]: insertedResumes[index]
                ? insertedResumes[index].id
                : null,
        }));

        const insertedTemplates = await trx<Template>(
            DatabaseTableName.TEMPLATES,
        )
            .insert(templatesMappedSeed)
            .returning('*');

        //REVIEWS
        const reviewsMappedSeed = reviewsSeed.map((review) => ({
            ...review,
            [DatabaseColumnName.USER_ID]:
                insertedUsers[getRandomIndex(insertedUsers.length)].id,
        }));

        await trx<Review>(DatabaseTableName.REVIEWS)
            .insert(reviewsMappedSeed)
            .returning('*');

        // EDUCATION
        const educationMappedSeed = educationSeed.map((education) => ({
            ...education,
            [DatabaseColumnName.RESUME_ID]:
                insertedResumes[getRandomIndex(insertedResumes.length)].id,
        }));

        await trx<Education>(DatabaseTableName.EDUCATION)
            .insert(educationMappedSeed)
            .returning('*');

        // CONTACT_DETAILS
        const contactsMappedSeed = contactsSeed.map((contact) => ({
            ...contact,
            [DatabaseColumnName.RESUME_ID]:
                insertedResumes[getRandomIndex(insertedResumes.length)].id,
        }));

        await trx<ContactDetails>(DatabaseTableName.CONTACT_DETAILS)
            .insert(contactsMappedSeed)
            .returning('*');

        // EXPERIENCE
        const experienceMappedSeed = experienceSeed.map((experience) => ({
            ...experience,
            [DatabaseColumnName.RESUME_ID]:
                insertedResumes[getRandomIndex(insertedResumes.length)].id,
        }));

        await trx<Experience>(DatabaseTableName.EXPERIENCE)
            .insert(experienceMappedSeed)
            .returning('*');

        // TECHNICAL_SKILLS
        const technicalSkillsMappedSeed = technicalSkillsSeed.map((skill) => ({
            ...skill,
            [DatabaseColumnName.RESUME_ID]:
                insertedResumes[getRandomIndex(insertedResumes.length)].id,
        }));

        await trx<TechnicalSkill>(DatabaseTableName.TECHNICAL_SKILLS)
            .insert(technicalSkillsMappedSeed)
            .returning('*');

        // PERSONAL_INFORMATION
        const personalInformationMappedSeed = personalInformationSeed.map(
            (info) => ({
                ...info,
                [DatabaseColumnName.RESUME_ID]:
                    insertedResumes[getRandomIndex(insertedResumes.length)].id,
            }),
        );

        await trx<PersonalInformation>(DatabaseTableName.PERSONAL_INFORMATION)
            .insert(personalInformationMappedSeed)
            .returning('*');

        //RECENTLY_VIEWED
        const numberOfRows = 4;

        const recentlyViewedSeed = Array.from({ length: numberOfRows }).map(
            () => ({
                [DatabaseColumnName.USER_ID]:
                    insertedUsers[getRandomIndex(insertedUsers.length)].id,
                [DatabaseColumnName.RESUME_ID]:
                    insertedResumes[getRandomIndex(insertedResumes.length)].id,
                [DatabaseColumnName.TEMPLATE_ID]:
                    insertedTemplates[getRandomIndex(insertedTemplates.length)]
                        .id,
            }),
        );

        await trx(DatabaseTableName.RECENTLY_VIEWED)
            .insert(recentlyViewedSeed)
            .returning('*');
    });
}

export { seed };
