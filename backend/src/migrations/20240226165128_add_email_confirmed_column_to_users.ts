import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
    EMAIL: 'email',
    PASSWORD_HASH: 'password_hash',
    PASSWORD_SALT: 'password_salt',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    EMAIL_CONFIRMED: 'email_confirmed', // New column
};

function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.boolean(ColumnName.EMAIL_CONFIRMED).defaultTo(false);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.EMAIL_CONFIRMED);
    });
}

export { down, up };
