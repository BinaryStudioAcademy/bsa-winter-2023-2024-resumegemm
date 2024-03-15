import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    createResumeFromTemplateSettings,
    updateResumeKeysFromInputs,
    updateTemplateSettingsBlocks,
} from '~/bundles/resume/helpers/helpers';
import { openDownloadLinkForPDF } from '~/helpers/helpers.js';

import {
    type AsyncThunkConfig,
    type GeneratePdfRequestDto,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type ResumeWithRelationsAndTemplateResponseDto,
    type TemplateSettings,
    type UserWithProfileRelation,
} from '../types/types';
import { name as sliceName } from './slice.js';

const getAllResumes = createAsyncThunk<
    ResumeGetAllResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-all-resumes`, (_, { extra }) => {
    const { resumeApi } = extra;
    return resumeApi.getAllResumes();
});

const createResume = createAsyncThunk<
    ResumeGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/create-resume`, (_, { extra, getState }) => {
    const state = getState();
    const { resumeApi } = extra;
    const {
        userProfile: { avatar, firstName },
        email,
    } = state.auth.user as UserWithProfileRelation;
    const templateSettings = state.resumes.templateSettings as TemplateSettings;

    const resume = createResumeFromTemplateSettings({
        firstName,
        email,
        templateSettings,
        avatar: avatar ?? '',
    });

    const templateId = state.resumes.currentTemplateId;
    return resumeApi.createResume(resume, templateId as string);
});

const getCurrentResumeWithTemplate = createAsyncThunk<
    {
        resumeWithTemplate: ResumeWithRelationsAndTemplateResponseDto;
        templateSettingsWithUpdatedUserData: TemplateSettings;
    },
    string,
    AsyncThunkConfig
>(`${sliceName}/get-current-resume`, async (resumeId, { extra, getState }) => {
    const { resumeApi } = extra;
    const {
        email,
        userProfile: { avatar, firstName },
    } = getState().auth.user as UserWithProfileRelation;

    const resumeWithTemplate = await resumeApi.getOneWithTemplate(resumeId);
    const {
        templates: { templateSettings },
        personalInformation,
        technicalSkills,
        customSections,
        certification,
        contacts,
        experience,
        education,
    } = resumeWithTemplate;

    const mergedResumeSections = [
        ...customSections,
        ...certification,
        ...experience,
        ...education,
        ...technicalSkills,
    ];
    const mergedResumeSectionsToObject = Object.assign(
        {},
        ...mergedResumeSections,
    );

    const resumePayload = {
        email,
        avatar,
        firstName,
        ...personalInformation,
        ...contacts,
        ...mergedResumeSectionsToObject,
    };

    const templateSettingsWithUpdatedUserData = {
        ...templateSettings,
        containers: updateTemplateSettingsBlocks(
            templateSettings.containers,
            resumePayload,
        ),
    };
    return {
        resumeWithTemplate,
        templateSettingsWithUpdatedUserData,
    };
});

const setTemplateSettingsOnResumeCreate = createAsyncThunk<
    TemplateSettings,
    TemplateSettings,
    AsyncThunkConfig
>(`${sliceName}/set-template-settings`, (templateSettings, { getState }) => {
    const {
        email,
        userProfile: { avatar, firstName },
    } = getState().auth.user as UserWithProfileRelation;

    const authUserPayload = {
        email,
        avatar,
        firstName,
    };

    return {
        ...templateSettings,
        containers: updateTemplateSettingsBlocks(
            templateSettings.containers,
            authUserPayload,
        ),
    };
});

const getResumeReviewFromAI = createAsyncThunk<
    ResumeAiScoreResponseDto,
    ResumeAiScoreRequestDto,
    AsyncThunkConfig
>(`${sliceName}/get-resume-review`, (resume, { extra }) => {
    const { resumeApi } = extra;
    return resumeApi.requestResumeReviewFromAI(resume);
});

const updateCurrentResume = createAsyncThunk<
    ResumeWithRelationsAndTemplateResponseDto,
    { itemId: string; value: string },
    AsyncThunkConfig
>(
    `${sliceName}/update-current-resume`,
    ({ itemId, value }, { extra, getState }) => {
        const { resumeApi } = extra;
        const { templates, ...restResumeProperties } = getState().resumes
            .currentResume as ResumeWithRelationsAndTemplateResponseDto;
        const updatedResumeData = updateResumeKeysFromInputs(
            restResumeProperties,
            itemId,
            value,
        );

        return resumeApi.updateResume(
            { ...updatedResumeData, resume: {} },
            restResumeProperties.id,
        );
    },
);

const downloadPDFDocument = createAsyncThunk<
    unknown,
    GeneratePdfRequestDto,
    AsyncThunkConfig
>(`${sliceName}/download-pdf-doc`, async (html, { extra }) => {
    const { pdfApi } = extra;
    const blob = await pdfApi.generatePDFFileFromHTMLString(html);
    openDownloadLinkForPDF(blob);
});

export {
    createResume,
    downloadPDFDocument,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    setTemplateSettingsOnResumeCreate,
    updateCurrentResume,
};
