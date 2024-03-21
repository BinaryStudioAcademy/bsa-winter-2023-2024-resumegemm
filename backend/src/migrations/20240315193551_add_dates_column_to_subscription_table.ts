import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.SUBSCRIPTION, (table) => {
        table.date(DatabaseColumnName.START_DATE);
        table.date(DatabaseColumnName.END_DATE);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.SUBSCRIPTION,
        function (table) {
            table.dropColumn(DatabaseColumnName.START_DATE);
            table.dropColumn(DatabaseColumnName.END_DATE);
        },
    );
}

export { down, up };
