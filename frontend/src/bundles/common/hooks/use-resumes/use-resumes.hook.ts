import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useParams,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';
import {
    type ConvertResumeItemToStringPayload,
    type ResumeAiScoreResponseDto,
    type ResumeGetAllResponseDto,
    type TemplateSettings,
} from '~/bundles/resume/types/types';
import { actions as resumeAccessActions } from '~/bundles/resume-access/store/index';
import {
    convertResumeItemFieldsToString,
    copyLinkToClipboardAndShowToast,
} from '~/helpers/helpers';

type UseResumesReturnValues = {
    userId: string | undefined;
    resumes: ResumeGetAllResponseDto[];
    templateSettings: TemplateSettings | undefined;
    createResumeAccessLink: () => void;
    requestResumeReviewFromAI: () => void;
    resumeReview: ResumeAiScoreResponseDto | null;
    dataStatus: DataStatus;
};

const useResumes = (): UseResumesReturnValues => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const {
        userId,
        resumes,
        dataStatus,
        templateSettings,
        currentResume,
        resumeReview,
    } = useAppSelector(({ auth, resumes }) => ({
        userId: auth.user?.id,
        resumes: resumes.resumes,
        currentResume: resumes.currentResume,
        dataStatus: resumes.dataStatus,
        templateSettings: resumes.currentResume?.templates.templateSettings,
        resumeReview: resumes.resumeReview,
    }));

    const requestResumeReviewFromAI = useCallback(() => {
        if (currentResume) {
            const resume = convertResumeItemFieldsToString({
                ...currentResume,
            } as ConvertResumeItemToStringPayload);
            void dispatch(resumeActions.getResumeReviewFromAI({ resume }));
        }
    }, [dispatch, currentResume]);

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
        if (dataStatus === DataStatus.IDLE) {
            void dispatch(resumeActions.getAllResumes());
        }
    }, [dataStatus, dispatch]);

    return {
        userId,
        resumes,
        templateSettings,
        createResumeAccessLink,
        requestResumeReviewFromAI,
        resumeReview,
        dataStatus,
    };
};

export { useResumes };