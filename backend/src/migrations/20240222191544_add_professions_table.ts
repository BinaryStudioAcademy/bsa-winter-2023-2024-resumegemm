import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DatabaseTableName.PROFESSIONS, (table) => {
        table.uuid(DatabaseColumnName.ID).primary();
        table.string(DatabaseColumnName.PROFESSION).notNullable();
        table
            .integer(DatabaseColumnName.INDUSTRY_ID)
            .unsigned()
            .references('id')
            .inTable(DatabaseTableName.INDUSTRIES)
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DatabaseTableName.INDUSTRIES);
}

export { down, up };
