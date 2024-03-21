import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.SUBSCRIPTION, (table) => {
        table.boolean(DatabaseColumnName.IS_CANCELLED).defaultTo(false);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.SUBSCRIPTION,
        function (table) {
            table.dropColumn(DatabaseColumnName.IS_CANCELLED);
        },
    );
}

export { down, up };
