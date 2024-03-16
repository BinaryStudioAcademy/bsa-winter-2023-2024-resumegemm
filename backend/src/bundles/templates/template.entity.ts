import {
    type TemplateBlockSettings,
    type TemplateEntityFields,
} from 'shared/build/bundles/templates/templates.js';

class TemplateEntity {
    private 'id': string;

    private 'name': string;

    private 'isOwner': boolean;

    private 'userId': string;

    private 'image': string;

    private 'templateSettings': TemplateBlockSettings;

    private constructor({
        id,
        isOwner,
        userId,
        image,
        name,
        templateSettings,
    }: TemplateEntityFields) {
        this.id = id;
        this.name = name;
        this.isOwner = isOwner;
        this.userId = userId;
        this.image = image;
        this.templateSettings = templateSettings;
    }

    public static initialize({
        id,
        name,
        isOwner,
        userId,
        image,
        templateSettings,
    }: TemplateEntityFields): TemplateEntity {
        return new TemplateEntity({
            id,
            name,
            isOwner,
            userId,
            image,
            templateSettings,
        });
    }
}

export { TemplateEntity };
