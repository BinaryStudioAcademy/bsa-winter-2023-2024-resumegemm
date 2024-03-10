import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

const UUID_GENERATION_FUNCTION = 'uuid_generate_v4()';

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await knex.schema.createTable(DatabaseTableName.SUBSCRIPTION, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .unique()
            .primary()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
        table.string(DatabaseColumnName.STATUS).notNullable();
        table.string(DatabaseColumnName.SUBSCRIPTION_ID).notNullable();
        table
            .uuid(DatabaseColumnName.USER_ID)
            .notNullable()
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table
            .uuid(DatabaseColumnName.SUBSCRIPTION_PLAN_ID)
            .notNullable()
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.SUBSCRIPTION_PLANS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table
            .dateTime(DatabaseColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(DatabaseColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.SUBSCRIPTION);
}

export { down, up };
