import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.string(DatabaseColumnName.TEMPLATE_NAME);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.TEMPLATE_NAME);
    });
}

export { down, up };
