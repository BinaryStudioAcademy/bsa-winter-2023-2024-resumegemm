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
    type ResumeGetAllResponseDto,
    type TemplateSettings,
} from '~/bundles/resume/types/types';
import { actions as resumeAccessActions } from '~/bundles/resume-access/store/index';

type UseResumesReturnValues = {
    userId: string | undefined;
    resumes: ResumeGetAllResponseDto[];
    templateSettings: TemplateSettings | undefined;
    createResumeAccessLink: () => void;
};

const useResumes = (): UseResumesReturnValues => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const { userId, resumes, dataStatus, templateSettings } = useAppSelector(
        ({ auth, resumes }) => ({
            userId: auth.user?.id,
            resumes: resumes.resumes,
            dataStatus: resumes.dataStatus,
            templateSettings: resumes.currentResume?.templates.templateSettings,
        }),
    );

    const createResumeAccessLink = useCallback(() => {
        void dispatch(
            resumeAccessActions.createResumeAccess({ resumeId: id as string }),
        );
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
    };
};

export { useResumes };
