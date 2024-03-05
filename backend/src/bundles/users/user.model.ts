import {
    Model,
    type Modifiers,
    type QueryBuilder,
    type RelationMappings,
} from 'objection';

import { ProfileModel } from '~/bundles/profile/profile.model.js';
import { TemplateModel } from '~/bundles/templates/templates.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'profileId': string;

    public 'passwordHash': string;

    public 'passwordSalt': string;

    public deletedAt!: string | null;
    
    public 'stripeId': string;

    public static override get tableName(): typeof DatabaseTableName.USERS {
        return DatabaseTableName.USERS;
    }

    public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
        return {
            withoutHashPasswords(builder): QueryBuilder<UserModel> {
                return builder.select(
                    'id',
                    'email',
                    'profileId',
                    'createdAt',
                    'updatedAt',
<<<<<<< HEAD
                    'deletedAt',
=======
                    'stripeId',
>>>>>>> 9ef4e6e6 (rg-139: + Added stripe id to user model.)
                );
            },
        };
    }

    public static getRelationMappings(): RelationMappings {
        return {
            user_profile: {
                relation: Model.HasOneRelation,
                modelClass: ProfileModel,
                join: {
                    from: `${DatabaseTableName.USERS}.profileId`,
                    to: `${DatabaseTableName.PROFILE}.id`,
                },
            },
            templates: {
                relation: Model.ManyToManyRelation,
                modelClass: TemplateModel,
                join: {
                    from: `${DatabaseTableName.USERS}.id`,
                    through: {
                        from: `${DatabaseTableName.USER_TEMPLATES}.userId`,
                        to: `${DatabaseTableName.USER_TEMPLATES}.templateId`,
                    },
                    to: `${DatabaseTableName.TEMPLATES}.id`,
                },
            },
        };
    }
}

export { UserModel };
