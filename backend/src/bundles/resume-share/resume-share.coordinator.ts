import {
    type GetUserResumeSharesResponse,
    HttpCode,
    HTTPError,
} from 'shared/build/index.js';

import { type ResumeService } from '../resumes/resume.service.js';
import { ResumeShareErrorMessage } from './enums/error-messages.js';
import { type ResumeShareRepository } from './resume-share.repository.js';

class ResumeShareCoordinator {
    private resumeShareRepository: ResumeShareRepository;
    private resumeService: ResumeService;

    public constructor(
        resumeService: ResumeService,
        resumeShareRepository: ResumeShareRepository,
    ) {
        this.resumeShareRepository = resumeShareRepository;
        this.resumeService = resumeService;
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
