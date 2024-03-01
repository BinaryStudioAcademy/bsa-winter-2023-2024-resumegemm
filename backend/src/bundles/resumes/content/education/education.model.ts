import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class EducationModel extends AbstractModel {
    public 'resumeId': string;
    public 'major': string;
    public 'degree': string;
    public 'startDate': string;
    public 'endDate'?: string;

    public static override get tableName(): typeof DatabaseTableName.EDUCATION {
        return DatabaseTableName.EDUCATION;
    }
}

export { EducationModel };
