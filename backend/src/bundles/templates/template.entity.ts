import { type TemplateBlockSettings, type TemplateEntityFields } from 'shared/build/bundles/templates/templates.js';

class TemplateEntity {
    private 'id': string | null;

    private 'isOwner': boolean;

    private 'templateSettings': TemplateBlockSettings;

    private constructor({
        id,
        isOwner,
        templateSettings,
    }: TemplateEntityFields) {
        this.id = id;
        this.isOwner = isOwner;
        this.templateSettings = templateSettings;
    }

    public static initialize({
        id,
        isOwner,
        templateSettings,
    }: TemplateEntityFields): TemplateEntity {
        return new TemplateEntity({
            id,
            isOwner,
            templateSettings,
        });
    }
}

export { TemplateEntity };