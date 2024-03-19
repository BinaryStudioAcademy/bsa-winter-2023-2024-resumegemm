import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
    });
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.dropForeign([DatabaseColumnName.RESUME_ID]);
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table
            .foreign(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table
            .foreign(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table
            .foreign(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table
                .foreign(DatabaseColumnName.RESUME_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.RESUMES)
                .onDelete(RelationRule.CASCADE);
        },
    );
}

export { down, up };
