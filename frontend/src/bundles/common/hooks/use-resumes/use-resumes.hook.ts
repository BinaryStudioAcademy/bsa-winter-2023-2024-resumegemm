import { type FindAllOptions } from 'shared/build';

import {
    AppRoute,
    CommonMessage,
    DataStatus,
    ToastType,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useParams,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import {
    type ConvertResumeItemToStringPayload,
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type TemplateDto,
    type TemplateSettings,
} from '~/bundles/resume/types/types';
import { actions as resumeAccessActions } from '~/bundles/resume-access/store/index';
import { actions as templateActions } from '~/bundles/templates-page/store/index';
import { showToast } from '~/bundles/toast/helpers/show-toast';
import {
    convertResumeItemFieldsToString,
    copyLinkToClipboardAndShowToast,
} from '~/helpers/helpers';

type UseResumesReturnValues = {
    userId: string | undefined;
    resumes: ResumeGetAllResponseDto[];
    templateSettings: TemplateSettings | null;
    createResumeAccessLink: () => void;
    requestResumeReviewFromAI: () => void;
    createResume: (screenshot: string) => void;
    deleteResume: (resumeId: string) => void;
    downloadGeneratedFile: (html: string) => void;
    resumeReview: ResumeAiScoreResponseDto | null;
    dataStatus: DataStatus;
    id?: string;
};

const getRandomItem = (template: TemplateDto[]): TemplateDto | null => {
    const randomIndex = Math.floor(Math.random() * template.length);
    return template[randomIndex];
};

const useResumes = (options?: FindAllOptions): UseResumesReturnValues => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const {
        userId,
        resumes,
        dataStatus,
        templateSettings,
        currentResume,
        resumeReview,
        templates,
        isTemplatesLoading,
    } = useAppSelector(({ auth, resumes, templates }) => ({
        userId: auth.user?.id,
        resumes: resumes.resumes,
        currentResume: resumes.currentResume,
        dataStatus: resumes.dataStatus,
        templateSettings: resumes.templateSettings,
        resumeReview: resumes.resumeReview,
        templates: templates.templates,
        isTemplatesLoading: templates.dataStatus,
    }));

    const deleteResume = useCallback(
        (resumeId: string) => {
            void dispatch(resumeActions.deleteResume(resumeId))
                .unwrap()
                .then(() =>
                    showToast(
                        CommonMessage.SUCCESS_DELETE_RESUME,
                        ToastType.INFO,
                        {
                            position: 'top-right',
                        },
                    ),
                );
        },
        [dispatch],
    );

    const requestResumeReviewFromAI = useCallback(() => {
        if (currentResume) {
            const resume = convertResumeItemFieldsToString({
                ...currentResume,
            } as ConvertResumeItemToStringPayload);
            void dispatch(resumeActions.getResumeReviewFromAI({ resume }));
        }
    }, [dispatch, currentResume]);

    const downloadGeneratedFile = useCallback(
        (html: string) => {
            void dispatch(resumeActions.downloadPDFDocument({ html }));
        },
        [dispatch],
    );

    const createResume = useCallback(
        (screenshot: string) => {
            void dispatch(resumeActions.createResume(screenshot))
                .unwrap()
                .then(() => {
                    showToast(
                        CommonMessage.SUCCESS_CREATE_RESUME,
                        ToastType.SUCCESS,
                        {
                            position: 'top-right',
                        },
                    );
                    navigate(AppRoute.HOME);
                });
        },
        [navigate, dispatch],
    );

    const createResumeAccessLink = useCallback(() => {
        void dispatch(
            resumeAccessActions.createResumeAccess({ resumeId: id as string }),
        )
            .unwrap()
            .then((payload) => {
                const linkId = payload.id;
                copyLinkToClipboardAndShowToast(linkId);
            });
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
            void dispatch(resumeActions.getCurrentResumeWithTemplate(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentResume) {
            return;
        }
        if (isTemplatesLoading === DataStatus.IDLE && templates.length === 0) {
            void dispatch(templateActions.loadAllTemplates())
                .unwrap()
                .then((templates) => {
                    const template = getRandomItem(templates);
                    void dispatch(
                        resumeActions.setTemplateSettingsOnResumeCreate(
                            template?.templateSettings as TemplateSettings,
                        ),
                    );
                    void dispatch(
                        resumeActions.setCurrentTemplateId(template?.id),
                    );
                });
        }
    }, [currentResume, isTemplatesLoading, dispatch, templates.length]);

    useEffect(() => {
        void dispatch(resumeActions.getAllResumes({ name: options?.name }));
    }, [dispatch, options?.name]);

    return {
        userId,
        resumes,
        templateSettings,
        createResumeAccessLink,
        requestResumeReviewFromAI,
        resumeReview,
        dataStatus,
        downloadGeneratedFile,
        id,
        createResume,
        deleteResume,
    };
};

export { useResumes };
