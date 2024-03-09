import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, function (table) {
        table.boolean(DatabaseColumnName.EMAIL_CONFIRMED).defaultTo(false);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, function (table) {
        table.dropColumn(DatabaseColumnName.EMAIL_CONFIRMED);
    });
}

export { down, up };
