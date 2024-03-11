import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(
        DatabaseTableName.CURRENT_SUBSCRIPTIONS,
        (table) => {
            table.uuid(DatabaseColumnName.ID).primary();
            table
                .string(DatabaseColumnName.CUSTOMER_ID)
                .notNullable()
                .references(DatabaseColumnName.STRIPE_ID)
                .inTable(DatabaseTableName.USERS)
                .onDelete(RelationRule.CASCADE);
            table.string(DatabaseColumnName.SUBSCRIPTION_ID).notNullable();
            table.dateTime(DatabaseColumnName.SUBSCRIPTION_START).notNullable();
            table.dateTime(DatabaseColumnName.SUBSCRIPTION_END).notNullable();
            table.boolean(DatabaseColumnName.IS_ACTIVE).notNullable();
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.CURRENT_SUBSCRIPTIONS,
        (table) => {
            table.dropForeign([DatabaseColumnName.CUSTOMER_ID]);
        },
    );

    await knex.schema.dropTableIfExists(
        DatabaseTableName.CURRENT_SUBSCRIPTIONS,
    );
}

export { down, up };
