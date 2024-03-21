import { FontFamily } from '../enums/font-family';
import { FontSize } from '../enums/font-size';
import { FontStyles } from '../enums/font-styles';

const dropdownFontStyleOptions = [
    {
        label: FontStyles.Regular,
        value: FontStyles.Regular,
    },
    {
        label: FontStyles.Bold,
        value: FontStyles.Bold,
    },
    {
        label: FontStyles.Italic,
        value: FontStyles.Italic,
    },
    {
        label: FontStyles.BoldItalic,
        value: FontStyles.BoldItalic,
    },
];

const dropdownFontFamilyOptions = [
    {
        label: FontFamily.SansSerif,
        value: FontFamily.SansSerif,
    },
    {
        label: FontFamily.Serif,
        value: FontFamily.Serif,
    },
];

const dropdownFontSizeOptions = [
    {
        label: FontSize.Small,
        value: FontSize.Small,
    },
    {
        label: FontSize.Medium,
        value: FontSize.Medium,
    },
    {
        label: FontSize.Big,
        value: FontSize.Big,
    },
    {
        label: FontSize.VeryBig,
        value: FontSize.VeryBig,
    },
];

export {
    dropdownFontFamilyOptions,
    dropdownFontSizeOptions,
    dropdownFontStyleOptions,
};
