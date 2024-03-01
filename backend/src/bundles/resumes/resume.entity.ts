import { Guid as guid } from 'guid-typescript';
import { type ResumeEntityFields } from 'shared/build/index.js';

import { type IResumeEntity } from './interfaces/resume-entity.interface';

class ResumeEntity implements IResumeEntity {
    public 'id': string | null;
    public 'title': string;
    public 'image': string;
    public 'userId': string;
    public 'templateId': string;

    private constructor({
        id,
        title,
        image,
        userId,
        templateId,
    }: ResumeEntityFields) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.userId = userId;
        this.templateId = templateId;
    }

    public static initialize({
        id,
        title,
        image,
        userId,
        templateId,
    }: ResumeEntityFields): ResumeEntity {
        return new ResumeEntity({
            id,
            title,
            image,
            userId,
            templateId,
        });
    }

    public static initializeNew({
        title,
        image,
        userId,
        templateId,
    }: Omit<ResumeEntityFields, 'id'>): ResumeEntity {
        return new ResumeEntity({
            id: guid.raw(),
            title,
            image,
            userId,
            templateId,
        });
    }

    public toObject(): Pick<ResumeEntityFields, 'id' | 'title' | 'image'> {
        return {
            id: this.id as string,
            title: this.title,
            image: this.image,
        };
    }

    public toNewObject(): ResumeEntityFields {
        return {
            id: this.id as NonNullable<string>,
            title: this.title,
            image: this.image,
            userId: this.userId,
            templateId: this.templateId,
        };
    }
}

export { ResumeEntity };
