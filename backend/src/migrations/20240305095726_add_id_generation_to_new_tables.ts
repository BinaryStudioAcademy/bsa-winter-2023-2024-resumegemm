import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

const UUID_GENERATION_FUNCTION = 'uuid_generate_v4()';

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_RESUME_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.RESUMES)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );

    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.dropColumn(DatabaseColumnName.RESUME_ID);
            table.renameColumn(
                DatabaseColumnName.NEW_RESUME_ID,
                DatabaseColumnName.RESUME_ID,
            );
        },
    );

    // =====================================================================
    // CERTIFICATION
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.CERTIFICATION).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // LANGUAGES
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.LANGUAGES).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // CUSTOM_SECTIONS
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.CUSTOM_SECTIONS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // RESUME_SHARE_LINK
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_ID)
                .unique()
                .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
        },
    );
    await knex(DatabaseTableName.RESUME_SHARE_LINK).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });

    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_RESUME_SHARE_LINK_ID)
                .references(DatabaseColumnName.NEW_ID)
                .inTable(DatabaseTableName.RESUME_SHARE_LINK)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );

    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.dropForeign([DatabaseColumnName.RESUME_SHARE_LINK_ID]);
            table.dropColumn(DatabaseColumnName.RESUME_SHARE_LINK_ID);
            table.renameColumn(
                DatabaseColumnName.NEW_RESUME_SHARE_LINK_ID,
                DatabaseColumnName.RESUME_SHARE_LINK_ID,
            );
        },
    );

    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.dropPrimary();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.dropColumn(DatabaseColumnName.ID);
            table.renameColumn(
                DatabaseColumnName.NEW_ID,
                DatabaseColumnName.ID,
            );
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.primary([DatabaseColumnName.ID]);
        },
    );
    // =====================================================================
    // RESUME_SHARE_ACCESS
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_ID)
                .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
        },
    );
    await knex(DatabaseTableName.RESUME_SHARE_ACCESS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.dropPrimary();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.dropColumn(DatabaseColumnName.ID);
            table.renameColumn(
                DatabaseColumnName.NEW_ID,
                DatabaseColumnName.ID,
            );
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.primary([DatabaseColumnName.ID]);
        },
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.uuid(DatabaseColumnName.ID).notNullable().alter();
    });
    await knex.schema.alterTable(DatabaseTableName.CERTIFICATION, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });

    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.uuid(DatabaseColumnName.ID).notNullable().alter();
    });
    await knex.schema.alterTable(DatabaseTableName.LANGUAGES, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });

    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.uuid(DatabaseColumnName.ID).notNullable().alter();
    });
    await knex.schema.alterTable(DatabaseTableName.CUSTOM_SECTIONS, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });

    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.dropPrimary();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.uuid(DatabaseColumnName.ID).notNullable().alter();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_LINK,
        (table) => {
            table.primary([DatabaseColumnName.ID]);
        },
    );

    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.dropPrimary();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.uuid(DatabaseColumnName.ID).notNullable().alter();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.RESUME_SHARE_ACCESS,
        (table) => {
            table.primary([DatabaseColumnName.ID]);
        },
    );
}

export { down, up };
