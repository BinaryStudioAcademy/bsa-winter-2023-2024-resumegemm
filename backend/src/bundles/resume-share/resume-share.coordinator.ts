import {
    type GetUserResumeSharesResponse,
    type ResumeShareGetResponseDto,
    HttpCode,
    HTTPError,
} from 'shared/build/index.js';

// import { type Resume } from 'shared/build/index.js';
import { type ResumeService } from '../resumes/resume.service.js';
import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareRepository } from './resume-share.repository.js';
import { type ResumeShareAccessService } from './resume-share-access.service.js';

class ResumeShareCoordinator {
    private resumeShareRepository: ResumeShareRepository;
    private resumeService: ResumeService;
    private resumeShareAccessService: ResumeShareAccessService;

    public constructor(
        resumeService: ResumeService,
        resumeShareRepository: ResumeShareRepository,
        resumeShareAccessService: ResumeShareAccessService,
    ) {
        this.resumeShareRepository = resumeShareRepository;
        this.resumeService = resumeService;
        this.resumeShareAccessService = resumeShareAccessService;
    }

    public async getShareLink(
        id: string,
        ip: string,
    ): Promise<ResumeShareGetResponseDto | unknown> {
        await this.resumeShareAccessService.createShareAccess(id, ip);

        const sharedResume =
            await this.resumeShareRepository.getResumeShareLink(id);

        if (!sharedResume) {
            return;
        }

        const resume = await this.resumeService.findById(sharedResume.resumeId);

        if (resume) {
            const { image, resumeTitle } = resume;

            return { ...sharedResume, resume: { image, resumeTitle } };
        }
    }

    public async getUserShareLinksWithResumes(
        id: string,
    ): Promise<GetUserResumeSharesResponse> {
        try {
            const resumes = await this.resumeService.findAllByUserId(id);

            if (resumes.length === 0) {
                return {
                    resumes: [],
                };
            }

            const resumesIds = resumes.map((resume) => resume.id);

            const resumesWithLink =
                await this.resumeShareRepository.getShareLinksByIds(resumesIds);

            const resumesWithLinkAndImages = resumesWithLink.map(
                (resumeWithLink) => {
                    const resumeWithImage = resumes.find(
                        (resume) => resume.id === resumeWithLink.resume?.id,
                    );

                    if (resumeWithImage && resumeWithLink.resume) {
                        resumeWithLink.resume.image = resumeWithImage.image;
                    }

                    return resumeWithLink;
                },
            );

            return {
                resumes: resumesWithLinkAndImages,
            };
        } catch {
            throw new HTTPError({
                message: ResumeShareErrorMessage.RESUME_SHARES_NOT_FOUND_ERROR,
                status: HttpCode.BAD_REQUEST,
            });
        }
    }
}

export { ResumeShareCoordinator };
