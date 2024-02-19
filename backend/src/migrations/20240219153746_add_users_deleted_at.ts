import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dateTime(DatabaseColumnName.DELETED_AT);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.DELETED_AT);
    });
}

export { down, up };
