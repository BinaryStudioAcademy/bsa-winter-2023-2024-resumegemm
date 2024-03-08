import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.uuid(DatabaseColumnName.ID).primary();
            table
                .uuid(DatabaseColumnName.RESUME_ID)
                .notNullable()
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.RESUMES)
                .onDelete(RelationRule.CASCADE);
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
    await knex.schema.createTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.uuid(DatabaseColumnName.ID).primary();
            table
                .uuid(DatabaseColumnName.RESUME_SHARE_LINK_ID)
                .notNullable()
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.RESUME_SHARE_LINK)
                .onDelete(RelationRule.CASCADE);

            table
                .string(DatabaseColumnName.RESUME_SHARE_ACCESS_IP)
                .notNullable();
            table
                .dateTime(DatabaseColumnName.RESUME_SHARE_ACCESS_TIME)
                .notNullable()
                .defaultTo(knex.fn.now());
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
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.RESUME_SHARE_ACCESS);
    await knex.schema.dropTableIfExists(DatabaseTableName.RESUME_SHARE_LINK);
}

export { down, up };
