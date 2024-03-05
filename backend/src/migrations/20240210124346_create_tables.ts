import { type Knex } from 'knex';

import { OauthStrategy } from '~/bundles/oauth/enums/enums.js';
import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';
import { SkillLevel } from '~/common/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(DatabaseTableName.USERS, (table) => {
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.EMAIL).unique().notNullable();
        table.text(DatabaseColumnName.PASSWORD_HASH).notNullable();
        table.text(DatabaseColumnName.PASSWORD_SALT).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.EMAIL).notNullable();
        table
            .enu(
                DatabaseColumnName.OAUTH_STRATEGY,
                Object.values(OauthStrategy),
            )
            .notNullable();
        table.string(DatabaseColumnName.OAUTH_ID).notNullable();
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
    await knex.schema.createTable(DatabaseTableName.PROFILE, (table) => {
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.FIRST_NAME).notNullable();
        table.string(DatabaseColumnName.LAST_NAME);
        table.string(DatabaseColumnName.AVATAR);
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
            table.uuid(DatabaseColumnName.ID).primary();
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
        table.uuid(DatabaseColumnName.ID).primary();
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
            table.uuid(DatabaseColumnName.ID).primary();
            table.string(DatabaseColumnName.SKILL_NAME).notNullable();
            table
                .enu(DatabaseColumnName.SKILL_LEVEL, Object.values(SkillLevel))
                .notNullable();
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
        table.uuid(DatabaseColumnName.ID).primary();
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
            table.uuid(DatabaseColumnName.ID).primary();
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
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.RESUME_TITLE).notNullable();
        table.string(DatabaseColumnName.IMAGE).notNullable();
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
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.IMAGE).notNullable();
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
        table.jsonb(DatabaseColumnName.TEMPLATE_SETTINGS).defaultTo('{}');
    });
    await knex.schema.createTable(DatabaseTableName.REVIEWS, (table) => {
        table.uuid(DatabaseColumnName.ID).primary();
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
            table.uuid(DatabaseColumnName.ID).primary();
            table
                .dateTime(DatabaseColumnName.VIEWED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
    await knex.schema.createTable(DatabaseTableName.USER_TEMPLATES, (table) => {
        table.uuid(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.USER_ID).notNullable();
        table.uuid(DatabaseColumnName.TEMPLATE_ID).notNullable();
        table.unique([
            DatabaseColumnName.USER_ID,
            DatabaseColumnName.TEMPLATE_ID,
        ]);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.USERS);
    await knex.schema.dropTableIfExists(DatabaseTableName.OAUTH_USERS);
    await knex.schema.dropTableIfExists(DatabaseTableName.PROFILE);
    await knex.schema.dropTableIfExists(DatabaseTableName.PERSONAL_INFORMATION);
    await knex.schema.dropTableIfExists(DatabaseTableName.EXPERIENCE);
    await knex.schema.dropTableIfExists(DatabaseTableName.TECHNICAL_SKILLS);
    await knex.schema.dropTableIfExists(DatabaseTableName.EDUCATION);
    await knex.schema.dropTableIfExists(DatabaseTableName.CONTACT_DETAILS);
    await knex.schema.dropTableIfExists(DatabaseTableName.TEMPLATES);
    await knex.schema.dropTableIfExists(DatabaseTableName.RESUMES);
    await knex.schema.dropTableIfExists(DatabaseTableName.REVIEWS);
    await knex.schema.dropTableIfExists(DatabaseTableName.RECENTLY_VIEWED);
    await knex.schema.dropTableIfExists(DatabaseTableName.USER_TEMPLATES);
}

export { down, up };
