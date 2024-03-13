import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable(DatabaseTableName.INDUSTRIES, (table) => {
        table
            .uuid(DatabaseColumnName.ID)
            .unique()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string(DatabaseColumnName.INDUSTRY).notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DatabaseTableName.INDUSTRIES);
}

export { down, up };
