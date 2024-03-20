import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.string(DatabaseColumnName.RESET_PASSWORD_TOKEN);
        table.bigInteger(DatabaseColumnName.RESET_PASSWORD_TOKEN_EXPIRY);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumns(
            DatabaseColumnName.RESET_PASSWORD_TOKEN,
            DatabaseColumnName.RESET_PASSWORD_TOKEN_EXPIRY,
        );
    });
}

export { down, up };
