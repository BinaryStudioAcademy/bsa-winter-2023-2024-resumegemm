import { useContext, useState } from 'react';

import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { getAllResumesByUserId } from '~/bundles/resume/store/actions';
import {
    accessResumeDetails,
    getResumeAccessByResumeId,
} from '~/bundles/resume-access/store/actions';
import {
    type ResumeShareAccessGetResponseDto,
    type ResumeShareDetailsGetResponseDto,
} from '~/bundles/resume-access/types/types';
import { ToastContext } from '~/bundles/toast/context/toast-context';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';

type State = {
    resumeId: string | null;
    details: ResumeShareAccessGetResponseDto[];
    resumeViewHistory: Record<string, ResumeShareAccessGetResponseDto[]>;
};

type ReturnValue = {
    viewedResume: State;
    resumeViewHistory: Record<string, ResumeShareAccessGetResponseDto[]>;
};

const useLoadViewedResumes = (): ReturnValue => {
    const dispatch = useAppDispatch();

    const authUser = useAppSelector(({ auth }) => auth.user);
    const resumes = useAppSelector(({ resumes }) => resumes.resumes);
    const viewedResume = useAppSelector(({ resumeAccess }) => resumeAccess);
    const resumeViewHistory = useAppSelector(
        ({ resumeAccess }) => resumeAccess.resumeViewHistory,
    );

    const { showToast } = useContext(ToastContext);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [resumeIds, setResumeIds] = useState<string[]>([]);

    useEffect(() => {
        const getResumeIdAuthUser = async (): Promise<void> => {
            if (authUser && !dataLoaded) {
                await dispatch(
                    getAllResumesByUserId({
                        userId: authUser.id,
                    }),
                );

                setResumeIds(resumes.map((resume) => resume.resume.id));
                setDataLoaded(true);
            }
        };
        void getResumeIdAuthUser();
    }, [authUser, dataLoaded, dispatch, resumes]);

    useEffect(() => {
        const processResumeIds = async (resumeIds: string[]): Promise<void> => {
            for (const id of resumeIds) {
                await getResumeSharedRecord(id);
            }
        };

        const getResumeSharedRecord = async (id: string): Promise<void> => {
            try {
                const resumeShareLinkDate = await dispatch(
                    getResumeAccessByResumeId({ resumeId: id }),
                );

                const payload =
                    resumeShareLinkDate.payload as ResumeShareDetailsGetResponseDto;

                if (payload.id) {
                    await getResumeViewRecords(payload.id);
                }
            } catch (error) {
                handleError(error);
            }
        };

        const getResumeViewRecords = async (id: string): Promise<void> => {
            try {
                await dispatch(accessResumeDetails({ id }));
            } catch (error) {
                handleError(error);
            }
        };

        const handleError = (error: unknown): void => {
            if (error instanceof Error) {
                showToast(error.message, ToastType.ERROR);
            }
        };

        void processResumeIds(resumeIds);
    }, [resumeIds, dispatch, showToast]);

    return {
        viewedResume,
        resumeViewHistory,
    };
};

export { useLoadViewedResumes };
