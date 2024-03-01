import {
    type TemplateBlockSettings,
    type TemplateEntityFields,
} from 'shared/build/bundles/templates/templates.js';

class TemplateEntity {
    private 'id': string;

    private 'isOwner': boolean;

    private 'userId': string;

    private 'templateSettings': TemplateBlockSettings;

    private constructor({
        id,
        isOwner,
        userId,
        templateSettings,
    }: TemplateEntityFields) {
        this.id = id;
        this.isOwner = isOwner;
        this.userId = userId;
        this.templateSettings = templateSettings;
    }

    public static initialize({
        id,
        isOwner,
        userId,
        templateSettings,
    }: TemplateEntityFields): TemplateEntity {
        return new TemplateEntity({
            id,
            isOwner,
            userId,
            templateSettings,
        });
    }
}

export { TemplateEntity };
