type TemplateSettings = Record<
    string,
    {
        enabled: boolean;
    }
>;

type TransformedSettings = Record<string, boolean>;

function transformTemplateSettings(
    templateSettings: TemplateSettings,
): TransformedSettings {
    const newSettings: TransformedSettings = {};

    for (const key of Object.keys(templateSettings)) {
        newSettings[key] = templateSettings[key].enabled;
    }

    return newSettings;
}

export { transformTemplateSettings };
