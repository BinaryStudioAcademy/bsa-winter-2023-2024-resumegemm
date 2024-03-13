import { type Knex } from 'knex';

import { DatabaseTableName } from '~/common/database/database.package.js';
import { DatabaseColumnName } from '~/common/database/enums/database-column-name.enum.js';

const formatAlterTableEnumSql = (
    tableName: string,
    columnName: string,
    enums: string[],
): string => {
    const constraintName = `${tableName}_${columnName}_check`;
    const checkValues = enums.map((enu) => {
        return `'${enu}'::text`;
    });
    const checkValuesString = checkValues.join(', ');
    return `
        ALTER TABLE "${tableName}" DROP CONSTRAINT IF EXISTS "${constraintName}";
        ALTER TABLE "${tableName}" ADD CONSTRAINT "${constraintName}" CHECK ("${columnName}" = ANY (ARRAY[${checkValuesString}]));
      `;
};

async function up(knex: Knex): Promise<void> {
    await knex.raw(
        formatAlterTableEnumSql(
            DatabaseTableName.OAUTH_CONNECTIONS,
            DatabaseColumnName.OAUTH_STRATEGY,
            ['github', 'google', 'facebook', 'linkedin'],
        ),
    );
}

async function down(knex: Knex): Promise<void> {
    await knex.raw(
        formatAlterTableEnumSql(
            DatabaseTableName.OAUTH_CONNECTIONS,
            DatabaseColumnName.OAUTH_STRATEGY,
            ['github', 'google', 'facebook'],
        ),
    );
}

export { down, up };
