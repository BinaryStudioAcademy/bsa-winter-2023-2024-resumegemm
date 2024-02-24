import { type Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('email_subscriptions', (table) => {
        table.uuid('id').primary();
        table
            .uuid('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.alterTable('users', (table) => {
        table
            .uuid('email_subscription_id')
            .references('id')
            .inTable('email_subscriptions')
            .onDelete('SET NULL');
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('email_subscription_id');
    });
    await knex.schema.dropTable('email_subscriptions');
}

export { down, up };
