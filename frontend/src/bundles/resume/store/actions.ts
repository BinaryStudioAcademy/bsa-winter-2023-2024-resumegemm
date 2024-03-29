import { createAsyncThunk } from '@reduxjs/toolkit';
import { type FindAllOptions } from 'shared/build/index.js';

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
    FindAllOptions | undefined,
    AsyncThunkConfig
>(`${sliceName}/get-all-resumes`, (options, { extra }) => {
    const { resumeApi } = extra;
    const query = {
        direction: options?.direction ?? 'desc',
        name: options?.name ?? '',
    };
    return resumeApi.getAllResumes(query);
});

const deleteResume = createAsyncThunk<
    ResumeGetAllResponseDto[],
    string,
    AsyncThunkConfig
>(`${sliceName}/delete-resume`, async (resumeId, { extra, getState }) => {
    const { resumeApi } = extra;
    const { resumes } = getState().resumes;
    await resumeApi.deleteResume(resumeId);
    return resumes.filter((resume) => resume.id !== resumeId);
});

const createResume = createAsyncThunk<
    ResumeGetAllResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/create-resume`, (image, { extra, getState }) => {
    const state = getState();
    const { resumeApi } = extra;
    const {
        userProfile: { firstName, lastName },
        email,
    } = state.auth.user as UserWithProfileRelation;
    const templateSettings = state.resumes.templateSettings as TemplateSettings;

    const resume = createResumeFromTemplateSettings({
        firstName,
        lastName,
        email,
        templateSettings,
        image,
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
        languages,
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
        ...languages,
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
    { itemId: string; value: string; image: string },
    AsyncThunkConfig
>(
    `${sliceName}/update-current-resume`,
    ({ itemId, value, image }, { extra, getState }) => {
        const { resumeApi } = extra;
        const { templates, ...restResumeProperties } = getState().resumes
            .currentResume as ResumeWithRelationsAndTemplateResponseDto;

        const updatedResumeData = updateResumeKeysFromInputs(
            restResumeProperties,
            itemId,
            value,
        );
        return resumeApi.updateResume(
            {
                ...updatedResumeData,
                resume: {
                    image,
                    resumeTitle:
                        updatedResumeData.personalInformation?.profession,
                },
            },
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
    deleteResume,
    downloadPDFDocument,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    setTemplateSettingsOnResumeCreate,
    updateCurrentResume,
};
