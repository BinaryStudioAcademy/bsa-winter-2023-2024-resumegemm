import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DatabaseTableName.INDUSTRIES, (table) => {
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.INDUSTRY).notNullable();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DatabaseTableName.INDUSTRIES);
}

export { down, up };
