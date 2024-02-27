import { Guid as guid } from 'guid-typescript';
import { type ResumeEntityFields } from 'shared/build/index.js';

import { type IResumeEntity } from './interfaces/resume-entity.interface.js';

class ResumeEntity implements IResumeEntity {
    public 'id': string | null;
    public 'resumeTitle': string;
    public 'image': string;
    public 'userId': string;
    public 'templateId': string;

    private constructor({
        id,
        resumeTitle,
        image,
        userId,
        templateId,
    }: ResumeEntityFields) {
        this.id = id;
        this.resumeTitle = resumeTitle;
        this.image = image;
        this.userId = userId;
        this.templateId = templateId;
    }

    public static initialize({
        id,
        resumeTitle,
        image,
        userId,
        templateId,
    }: ResumeEntityFields): ResumeEntity {
        return new ResumeEntity({
            id,
            resumeTitle,
            image,
            userId,
            templateId,
        });
    }

    public static initializeNew({
        resumeTitle,
        image,
        userId,
        templateId,
    }: Omit<ResumeEntityFields, 'id'>): ResumeEntity {
        return new ResumeEntity({
            id: guid.raw(),
            resumeTitle,
            image,
            userId,
            templateId,
        });
    }

    public toObject(): Pick<
        ResumeEntityFields,
        'id' | 'resumeTitle' | 'image'
    > {
        return {
            id: this.id as string,
            resumeTitle: this.resumeTitle,
            image: this.image,
        };
    }

    public toNewObject(): ResumeEntityFields {
        return {
            id: this.id as NonNullable<string>,
            resumeTitle: this.resumeTitle,
            image: this.image,
            userId: this.userId,
            templateId: this.templateId,
        };
    }
}

export { ResumeEntity };
