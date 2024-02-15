import { AbstractModel, DatabaseTableName } from '../database/database.js';

  class FileModel extends AbstractModel {
    public 'url': string;
  
    public static override get tableName(): string {
      return DatabaseTableName.FILES;
    }
  }
  
  export { FileModel };