import { type Knex } from 'knex';

import {
    DatabaseColumnName,
    DatabaseTableName,
} from '~/common/database/enums/enums.js';

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

const UUID_GENERATION_FUNCTION = 'uuid_generate_v4()';

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    // =====================================================================
    // USERS
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .unique()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.USERS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });

    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_USER_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_USER_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_USER_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });

    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropForeign([DatabaseColumnName.USER_ID]);
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_USER_ID,
            DatabaseColumnName.USER_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropForeign([DatabaseColumnName.USER_ID]);
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_USER_ID,
            DatabaseColumnName.USER_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropForeign([DatabaseColumnName.USER_ID]);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_USER_ID,
            DatabaseColumnName.USER_ID,
        );
    });

    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // OAUTH_USERS
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .unique()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.OAUTH_USERS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // PROFILE
    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .unique()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.PROFILE).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_PROFILE_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.PROFILE)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_PROFILE_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.PROFILE)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });

    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropForeign([DatabaseColumnName.PROFILE_ID]);
        table.dropColumn(DatabaseColumnName.PROFILE_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_PROFILE_ID,
            DatabaseColumnName.PROFILE_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.dropForeign([DatabaseColumnName.PROFILE_ID]);
        table.dropColumn(DatabaseColumnName.PROFILE_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_PROFILE_ID,
            DatabaseColumnName.PROFILE_ID,
        );
    });

    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // PERSONAL_INFORMATION
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_ID)
                .unique()
                .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
        },
    );

    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.dropPrimary();
        },
    );
    await knex(DatabaseTableName.PERSONAL_INFORMATION).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.dropColumn(DatabaseColumnName.ID);
            table.renameColumn(
                DatabaseColumnName.NEW_ID,
                DatabaseColumnName.ID,
            );
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.primary([DatabaseColumnName.ID]);
        },
    );
    // =====================================================================
    // TECHNICAL_SKILLS
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_ID)
                .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
        },
    );
    await knex(DatabaseTableName.TECHNICAL_SKILLS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.dropPrimary();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.dropColumn(DatabaseColumnName.ID);
            table.renameColumn(
                DatabaseColumnName.NEW_ID,
                DatabaseColumnName.ID,
            );
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.primary([DatabaseColumnName.ID]);
        },
    );
    // =====================================================================
    // CONTACT_DETAILS
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.CONTACT_DETAILS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // EDUCATION
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.EDUCATION).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // EXPERIENCE
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.EXPERIENCE).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // REVIEWS
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.REVIEWS).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // RESUMES
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .unique()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.RESUMES).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_RESUME_ID)
                .references(DatabaseColumnName.NEW_ID)
                .inTable(DatabaseTableName.RESUMES)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table
                .uuid(DatabaseColumnName.NEW_RESUME_ID)
                .references(DatabaseColumnName.NEW_ID)
                .inTable(DatabaseTableName.RESUMES)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_RESUME_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });

    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.dropForeign([DatabaseColumnName.RESUME_ID]);
            table.dropColumn(DatabaseColumnName.RESUME_ID);
            table.renameColumn(
                DatabaseColumnName.NEW_RESUME_ID,
                DatabaseColumnName.RESUME_ID,
            );
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.dropForeign([DatabaseColumnName.RESUME_ID]);
            table.dropColumn(DatabaseColumnName.RESUME_ID);
            table.renameColumn(
                DatabaseColumnName.NEW_RESUME_ID,
                DatabaseColumnName.RESUME_ID,
            );
        },
    );
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.dropForeign([DatabaseColumnName.RESUME_ID]);
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_RESUME_ID,
            DatabaseColumnName.RESUME_ID,
        );
    });

    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // TEMPLATES
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .unique()
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.TEMPLATES).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });

    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_TEMPLATE_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.TEMPLATES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_TEMPLATE_ID)
            .references(DatabaseColumnName.NEW_ID)
            .inTable(DatabaseTableName.TEMPLATES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });

    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropForeign([DatabaseColumnName.TEMPLATE_ID]);
        table.dropColumn(DatabaseColumnName.TEMPLATE_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_TEMPLATE_ID,
            DatabaseColumnName.TEMPLATE_ID,
        );
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropForeign([DatabaseColumnName.TEMPLATE_ID]);
        table.dropColumn(DatabaseColumnName.TEMPLATE_ID);
        table.renameColumn(
            DatabaseColumnName.NEW_TEMPLATE_ID,
            DatabaseColumnName.TEMPLATE_ID,
        );
    });

    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // RECENTLY_VIEWED
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.RECENTLY_VIEWED).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropPrimary();
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
    // =====================================================================
    // USER_TEMPLATES
    await knex.schema.alterTable(DatabaseTableName.USER_TEMPLATES, (table) => {
        table
            .uuid(DatabaseColumnName.NEW_ID)
            .defaultTo(knex.raw(UUID_GENERATION_FUNCTION));
    });
    await knex(DatabaseTableName.USER_TEMPLATES).update({
        new_id: knex.raw('??', [DatabaseColumnName.ID]),
    });
    await knex.schema.alterTable(DatabaseTableName.USER_TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.renameColumn(DatabaseColumnName.NEW_ID, DatabaseColumnName.ID);
    });
    await knex.schema.alterTable(DatabaseTableName.USER_TEMPLATES, (table) => {
        table.primary([DatabaseColumnName.ID]);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.PROFILE, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.dropColumn(DatabaseColumnName.ID);
            table.uuid(DatabaseColumnName.ID).primary();
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.dropColumn(DatabaseColumnName.ID);
            table.uuid(DatabaseColumnName.ID).primary();
        },
    );
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });
    await knex.schema.alterTable(DatabaseTableName.USER_TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.ID);
        table.uuid(DatabaseColumnName.ID).primary();
    });

    // Rename foreign keys in other tables
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table
            .uuid(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.TEMPLATES, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table
            .uuid(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.USER_ID);
        table
            .uuid(DatabaseColumnName.USER_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.USERS, (table) => {
        table.dropColumn(DatabaseColumnName.PROFILE_ID);
        table
            .uuid(DatabaseColumnName.PROFILE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.PROFILE)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.OAUTH_USERS, (table) => {
        table.dropColumn(DatabaseColumnName.PROFILE_ID);
        table
            .uuid(DatabaseColumnName.PROFILE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.PROFILE)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.REVIEWS, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table
            .uuid(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table
            .uuid(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.EDUCATION, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table
            .uuid(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.EXPERIENCE, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table
            .uuid(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(
        DatabaseTableName.PERSONAL_INFORMATION,
        (table) => {
            table.dropColumn(DatabaseColumnName.RESUME_ID);
            table
                .uuid(DatabaseColumnName.RESUME_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.RESUMES)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );
    await knex.schema.alterTable(
        DatabaseTableName.TECHNICAL_SKILLS,
        (table) => {
            table.dropColumn(DatabaseColumnName.RESUME_ID);
            table
                .uuid(DatabaseColumnName.RESUME_ID)
                .references(DatabaseColumnName.ID)
                .inTable(DatabaseTableName.RESUMES)
                .onUpdate(RelationRule.CASCADE)
                .onDelete(RelationRule.SET_NULL);
        },
    );
    await knex.schema.alterTable(DatabaseTableName.CONTACT_DETAILS, (table) => {
        table.dropColumn(DatabaseColumnName.RESUME_ID);
        table
            .uuid(DatabaseColumnName.RESUME_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.RESUMES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RESUMES, (table) => {
        table.dropColumn(DatabaseColumnName.TEMPLATE_ID);
        table
            .uuid(DatabaseColumnName.TEMPLATE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.TEMPLATES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
    await knex.schema.alterTable(DatabaseTableName.RECENTLY_VIEWED, (table) => {
        table.dropColumn(DatabaseColumnName.TEMPLATE_ID);
        table
            .uuid(DatabaseColumnName.TEMPLATE_ID)
            .references(DatabaseColumnName.ID)
            .inTable(DatabaseTableName.TEMPLATES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
}

export { down, up };
