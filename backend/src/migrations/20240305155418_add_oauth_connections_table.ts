import { type Knex } from 'knex';
import { OauthStrategy } from 'shared/build/index.js';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(
        DatabaseTableName.OAUTH_CONNECTIONS,
        (table) => {
            table.uuid(DatabaseColumnName.ID).primary();
            table.string(DatabaseColumnName.EMAIL);
            table
                .enu(
                    DatabaseColumnName.OAUTH_STRATEGY,
                    Object.values(OauthStrategy),
                )
                .notNullable();
            table.string(DatabaseColumnName.OAUTH_ID).notNullable();
            table
                .uuid(DatabaseColumnName.USER_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.USERS)
                .onUpdate('CASCADE')
                .onDelete('SET NULL');
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
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(DatabaseTableName.OAUTH_CONNECTIONS);
}

export { down, up };
