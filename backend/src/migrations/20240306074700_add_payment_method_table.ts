import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

const UUID_GENERATION_FUNCTION = 'uuid_generate_v4()';

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await knex.schema.createTable(DatabaseTableName.PAYMENT_METHOD, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .unique()
            .primary()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
        table.string(DatabaseColumnName.PAYMENT_METHOD_ID).notNullable();
        table.string(DatabaseColumnName.CARD).notNullable();
        table.dateTime(DatabaseColumnName.CARD_TERM).notNullable();
        table.string(DatabaseColumnName.TYPE).notNullable();
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
    await knex.schema.dropTableIfExists(DatabaseTableName.PAYMENT_METHOD);
}

export { down, up };
