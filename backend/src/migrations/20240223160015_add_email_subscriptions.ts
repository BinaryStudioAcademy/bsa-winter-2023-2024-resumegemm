import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum';

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(
        DatabaseTableName.EMAIL_SUBSCRIPTIONS,
        (table) => {
            table.uuid(DatabaseColumnName.ID).primary();
            table
                .dateTime(DatabaseColumnName.CREATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
            table
                .dateTime(DatabaseColumnName.UPDATED_AT)
                .notNullable()
                .defaultTo(knex.fn.now());
        },
    );
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table
            .uuid(DatabaseColumnName.EMAIL_SUBSCRIPTION_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.EMAIL_SUBSCRIPTIONS)
            .onDelete('SET NULL');
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.EMAIL_SUBSCRIPTION_ID);
    });
    await knex.schema.dropTable(DatabaseTableName.EMAIL_SUBSCRIPTIONS);
}

export { down, up };
