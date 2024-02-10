import { AbstractModel, DatabaseTableName } from '~/common/database/database.js';

class ImageModel extends AbstractModel {
    public 'imageSource': string;

    public static get tableName(): typeof DatabaseTableName.IMAGES {
        return DatabaseTableName.IMAGES;
    }
}

export { ImageModel };

