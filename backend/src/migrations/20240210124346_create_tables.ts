import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(DatabaseTableName.USERS, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.EMAIL).unique().notNullable();
        table.string(DatabaseColumnName.USERNAME).notNullable();
        table.text(DatabaseColumnName.PASSWORD_HASH).notNullable();
        table.text(DatabaseColumnName.PASSWORD_SALT).notNullable();
        table.string(DatabaseColumnName.RECOVERY_CODE).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.IMAGES, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.IMAGE_SOURCE).unique().notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.increments(DatabaseColumnName.ID).primary();
            table.string(DatabaseColumnName.PROFESSION).notNullable();
            table.string(DatabaseColumnName.ADDRESS).notNullable();
            table.string(DatabaseColumnName.CITY).notNullable();
            table.string(DatabaseColumnName.STATE).notNullable();
            table
                .dateTime(DatabaseColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(DatabaseColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
    await knex.schema.createTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.JOB_TITLE).notNullable();
        table.string(DatabaseColumnName.EMPLOYER).notNullable();
        table.string(DatabaseColumnName.EMPLOYMENT_TYPE).notNullable();
        table.date(DatabaseColumnName.START_DATE).notNullable();
        table.date(DatabaseColumnName.END_DATE).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.increments(DatabaseColumnName.ID).primary();
            table.string(DatabaseColumnName.SKILL_NAME).notNullable();
            table.string(DatabaseColumnName.SKILL_LEVEL).notNullable();
            table
                .dateTime(DatabaseColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(DatabaseColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
    await knex.schema.createTable(DatabaseTableName.EDUCATION, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.MAJOR_NAME).notNullable();
        table.string(DatabaseColumnName.DEGREE).notNullable();
        table.string(DatabaseColumnName.LOCATION).notNullable();
        table.date(DatabaseColumnName.START_DATE).notNullable();
        table.date(DatabaseColumnName.END_DATE).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(
        DatabaseTableName.CONTACT_DETAILS,
        (table) => {
            table.increments(DatabaseColumnName.ID).primary();
            table
                .string(DatabaseColumnName.MOBILE_NUMBER)
                .unique()
                .notNullable();
            table.string(DatabaseColumnName.HOME_NUMBER).unique().notNullable();
            table.string(DatabaseColumnName.ADDRESS).notNullable();
            table.string(DatabaseColumnName.SOCIAL_CONTACT).notNullable();
            table
                .dateTime(DatabaseColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(DatabaseColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
    await knex.schema.createTable(DatabaseTableName.RESUMES, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.RESUME_TITLE).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.DELETED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.TEMPLATES, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table
            .boolean(DatabaseColumnName.IS_OWNER)
            .notNullable()
            .defaultTo(false);
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.DELETED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.REVIEWS, (table) => {
        table.increments(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.COMMENT).notNullable();
        table.integer(DatabaseColumnName.SCORE).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(
        DatabaseTableName.RECENTLY_VIEWED,
        (table) => {
            table.increments(DatabaseColumnName.ID).primary();
            table
                .dateTime(DatabaseColumnName.VIEWED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.USERS);
    await knex.schema.dropTableIfExists(DatabaseTableName.IMAGES);
    await knex.schema.dropTableIfExists(DatabaseTableName.PERSONAL_INFORMATION);
    await knex.schema.dropTableIfExists(DatabaseTableName.EXPERIENCE);
    await knex.schema.dropTableIfExists(DatabaseTableName.TECHNICAL_SKILLS);
    await knex.schema.dropTableIfExists(DatabaseTableName.EDUCATION);
    await knex.schema.dropTableIfExists(DatabaseTableName.CONTACT_DETAILS);
    await knex.schema.dropTableIfExists(DatabaseTableName.RESUMES);
    await knex.schema.dropTableIfExists(DatabaseTableName.TEMPLATES);
    await knex.schema.dropTableIfExists(DatabaseTableName.REVIEWS);
    await knex.schema.dropTableIfExists(DatabaseTableName.RECENTLY_VIEWED);
}

export { down, up };
