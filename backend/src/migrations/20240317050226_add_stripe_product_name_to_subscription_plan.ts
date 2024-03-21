import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.SUBSCRIPTION_PLANS,
        (table) => {
            table.string(DatabaseColumnName.STRIPE_PRODUCT_NAME);
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.SUBSCRIPTION_PLANS,
        function (table) {
            table.dropColumn(DatabaseColumnName.STRIPE_PRODUCT_NAME);
        },
    );
}

export { down, up };
