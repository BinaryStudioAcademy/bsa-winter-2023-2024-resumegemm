import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.dropUnique([DatabaseColumnName.PHONE_NUMBER]);
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.dropUnique([DatabaseColumnName.EMAIL]);
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.unique([DatabaseColumnName.PHONE_NUMBER]);
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.unique([DatabaseColumnName.EMAIL]);
        },
    );
}

export { down, up };
