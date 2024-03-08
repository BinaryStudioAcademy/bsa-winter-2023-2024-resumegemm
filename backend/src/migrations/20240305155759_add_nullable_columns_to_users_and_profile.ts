import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.text(DatabaseColumnName.PASSWORD_HASH).nullable().alter();
        table.text(DatabaseColumnName.PASSWORD_SALT).nullable().alter();
        table.text(DatabaseColumnName.EMAIL).nullable().alter();
    });
    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table.string(DatabaseColumnName.FIRST_NAME).nullable().alter();
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.PASSWORD_HASH);
        table.dropColumn(DatabaseColumnName.PASSWORD_SALT);
        table.dropColumn(DatabaseColumnName.EMAIL);
    });
    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table.dropColumn(DatabaseColumnName.FIRST_NAME);
    });
}

export { down, up };
