import { type ResumeEntityFields } from 'shared/build/index.js';

interface IResumeEntity {
    toObject(): Pick<ResumeEntityFields, 'id' | 'title' | 'image'>;

    toNewObject(): ResumeEntityFields;
}

export { type IResumeEntity };
