import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.RECENTLY_VIEWED,
        function (table) {
            table
                .uuid(DatabaseColumnName.OWNER_ID)
                .references('id')
                .inTable(DatabaseTableName.USERS)
                .onUpdate('CASCADE')
                .onDelete('SET NULL');
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(
        DatabaseTableName.RECENTLY_VIEWED,
        function (table) {
            table.dropColumn(DatabaseColumnName.OWNER_ID);
        },
    );
}

export { down, up };
