import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

const tablesToAlter = [
    DatabaseTableName.EDUCATION,
    DatabaseTableName.PERSONAL_INFORMATION,
    DatabaseTableName.TECHNICAL_SKILLS,
    DatabaseTableName.CONTACT_DETAILS,
    DatabaseTableName.EXPERIENCE,
];

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table
            .integer(DatabaseColumnName.IMAGE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.IMAGES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table
            .integer(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table
            .integer(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table
            .integer(DatabaseColumnName.IMAGE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.IMAGES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table
            .integer(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table
            .integer(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table
            .integer(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table
            .integer(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL)
            .nullable();
        table
            .integer(DatabaseColumnName.TEMPLATE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.TEMPLATES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL)
            .nullable();
    });
    await Promise.all(
        tablesToAlter.map((tableName) =>
            knex.schema.alterTable(tableName, (table) => {
                table
                    .integer(DatabaseColumnName.RESUME_ID)
                    .references(DatabaseColumnName.ID)
                    .inTable(DatabaseTableName.RESUMES)
                    .onUpdate(RelationRule.CASCADE)
                    .onDelete(RelationRule.SET_NULL);
            }),
        ),
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.IMAGE_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.dropColumn(DatabaseColumnName.IMAGE_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.dropColumn(DatabaseColumnName.TEMPLATE_ID);
    });
    await Promise.all(
        tablesToAlter.map((tableName) => {
            return knex.schema.alterTable(tableName, (table) => {
                table.dropColumn(DatabaseColumnName.RESUME_ID);
            });
        }),
    );
}

export { down, up };
