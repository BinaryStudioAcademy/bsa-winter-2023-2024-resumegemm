import {
    type LayoutItem,
    type TemplateSettings,
    LanguageLevels,
} from 'shared/build';

import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { Input } from '~/bundles/common/components/input/input';
import { TextArea } from '~/bundles/common/components/text-area/text-area';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks';
import { updateSettingsBlocksFromInputs } from '~/bundles/resume/helpers/update-settings-blocks-from-inputs.helper';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';

enum LayoutItemName {
    AVATAR = 'Avatar',
    DESCRIPTION = 'Description',
    LANGUAGE_LEVEL = 'Language Level',
}

type LayoutItemPayload = {
    isCreate?: boolean;
    item: LayoutItem;
    tabs: TemplateSettings['containers'];
    handleInputResumeFieldChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
};

const ContainerLayoutItem: React.FC<LayoutItemPayload> = ({
    item,
    tabs,
    handleInputResumeFieldChange,
    isCreate,
}) => {
    const dispatch = useAppDispatch();
    const languageLevelOptions = Object.values(LanguageLevels).map(
        (value: string) => ({ value: value, label: value }),
    );

    const defaultValue = languageLevelOptions.find(
        (option) => option.value === item.content,
    );

    const handleDropdownChange = useCallback(
        (selectedOption: string | undefined) => {
            if (selectedOption) {
                const updatedTemplateSettingsBlocks =
                    updateSettingsBlocksFromInputs(
                        tabs,
                        LayoutItemName.LANGUAGE_LEVEL,
                        selectedOption,
                    );
                void dispatch(
                    resumeActions.setNewTemplateSettings(
                        updatedTemplateSettingsBlocks,
                    ),
                );
                if (isCreate) {
                    return;
                }
                void dispatch(
                    resumeActions.updateCurrentResume({
                        itemId: 'languageLevel',
                        value: selectedOption,
                    }),
                );
            }
        },
        [dispatch, tabs, isCreate],
    );

    const renderContainerLayoutItem = useCallback(
        (item: LayoutItem) => {
            switch (item.name) {
                case LayoutItemName.AVATAR: {
                    return null;
                }
                case LayoutItemName.DESCRIPTION: {
                    return (
                        <TextArea
                            id={item.id}
                            value={item.content}
                            name={item.name}
                            onChange={handleInputResumeFieldChange}
                        />
                    );
                }
                case LayoutItemName.LANGUAGE_LEVEL: {
                    return (
                        <Dropdown
                            name={LayoutItemName.LANGUAGE_LEVEL}
                            onChange={handleDropdownChange}
                            options={languageLevelOptions}
                            defaultValue={defaultValue}
                        />
                    );
                }
                default: {
                    return (
                        <Input
                            id={item.id}
                            type="text"
                            name={item.name}
                            value={item.content}
                            onChange={handleInputResumeFieldChange}
                        />
                    );
                }
            }
        },
        [
            handleInputResumeFieldChange,
            handleDropdownChange,
            languageLevelOptions,
        ],
    );

    if (item.name === LayoutItemName.AVATAR) {
        return null;
    }

    return (
        <FormGroup label={item.name}>
            {renderContainerLayoutItem(item)}
        </FormGroup>
    );
};

export { ContainerLayoutItem };
