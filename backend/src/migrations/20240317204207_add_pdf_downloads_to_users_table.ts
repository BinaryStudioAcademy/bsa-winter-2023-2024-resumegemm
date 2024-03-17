import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.table(DatabaseTableName.USERS, (table) => {
        table.integer(DatabaseColumnName.PDF_DOWNLOADS).defaultTo(0);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.PDF_DOWNLOADS);
    });
}

export { down, up };
