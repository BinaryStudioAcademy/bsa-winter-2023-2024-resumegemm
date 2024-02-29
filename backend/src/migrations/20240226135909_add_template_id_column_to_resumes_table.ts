import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.RESUMES, function (table) {
        table
            .uuid(DatabaseColumnName.TEMPLATE_ID)
            .references('id')
            .inTable(DatabaseTableName.TEMPLATES)
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.RESUMES, function (table) {
        table.dropColumn(DatabaseColumnName.TEMPLATE_ID);
    });
}

export { down, up };
