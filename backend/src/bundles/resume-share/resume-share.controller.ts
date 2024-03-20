// import { resumeShareController } from '~/bundles/resume-share/resume-share.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type HTTPError, HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type User } from '../users/types/types.js';
import { ResumesApiPath } from './enums/enums.js';
import { type ResumeShareCoordinator } from './resume-share.coordinator.js';
import { type ResumeShareService } from './resume-share.service.js';
import {
    type GetUserResumeSharesResponse,
    type ResumeShareCreateRequestDto,
    type ResumeShareCreateResponseDto,
    type ResumeShareDeleteRequestDto,
    type ResumeShareDeleteResponseDto,
    type ResumeShareDetailsGetRequestDto,
    type ResumeShareDetailsGetResponseDto,
    type ResumeShareGetRequestDto,
    type ResumeShareGetResponseDto,
    type ResumeShareResponseDto,
} from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      ResumeShare:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          resumeId:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *      ResumeShareAccess:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          resumeShareLinkId:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          resumeShareAccessIp:
 *            type: string
 *          resumeShareAccessTime:
 *            type: string
 *            format: date-time
 *      ResumeShareDetails:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          resumeId:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          accesses:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ResumeShareAccess'
 */

class ResumeShareController extends Controller {
    private resumeShareService: ResumeShareService;
    private resumeShareCoordinator: ResumeShareCoordinator;

    public constructor(
        logger: ILogger,
        resumeShareService: ResumeShareService,
        resumeShareCoordinator: ResumeShareCoordinator,
    ) {
        super(logger, ApiPath.RESUMES);

        this.resumeShareService = resumeShareService;

        this.resumeShareCoordinator = resumeShareCoordinator;

        this.addRoute({
            path: ResumesApiPath.ID_SHARE(),
            method: 'POST',
            validation: {},
            handler: (options) =>
                this.createShareLink(
                    options as ApiHandlerOptions<ResumeShareCreateRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE_ID(),
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.getShareLink(
                    options as ApiHandlerOptions<ResumeShareGetRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE_ID(),
            method: 'DELETE',
            validation: {},
            handler: (options) =>
                this.deleteShareLink(
                    options as ApiHandlerOptions<ResumeShareDeleteRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE,
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.getUserShareLinksWithResumes(
                    options as ApiHandlerOptions<{
                        user: User;
                    }>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE_ID_DETAILS(),
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.getShareLinkDetails(
                    options as ApiHandlerOptions<ResumeShareDetailsGetRequestDto>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.SHARE_RESUME_ID(),
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.getResumeShareRecordByResumeId(
                    options as ApiHandlerOptions<ResumeShareDetailsGetRequestDto>,
                ),
        });
    }

    /**
     * @swagger
     * /resumes/:id/share:
     *    post:
     *      description: Create a share link
     *      requestBody:
     *        description: User auth data
     *        required: false
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/ResumeShare'
     *        400:
     *           description: Bad request
     * /resumes/share/:id:
     *     get:
     *      description: Access a resume
     *      requestBody:
     *        required: false
     *      responses:
     *        200:
     *          description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: object
     *                   $ref: '#/components/schemas/ResumeShare'
     *        404:
     *           description: Resume share not found
     *        400:
     *          description: Bad request
     * /resumes/share/:id:
     *     get:
     *      description: Access a resume
     *      requestBody:
     *        required: false
     *      responses:
     *        200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: object
     *                   $ref: '#/components/schemas/ResumeShare'
     *        404:
     *           description: Resume access link not found
     *        400:
     *          description: Bad request
     *     delete:
     *      description: Delete a access link
     *      requestBody:
     *        required: false
     *      responses:
     *        200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: object
     *                   $ref: '#/components/schemas/ResumeShare'
     *        404:
     *           description: Resume access link not found
     *        400:
     *          description: Bad request
     * /resumes/share/:id/details:
     *     get:
     *      description: Get resume details
     *      requestBody:
     *        required: false
     *      responses:
     *        200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: object
     *                   $ref: '#/components/schemas/ResumeShareDetails'
     *        404:
     *           description: Resume share not found
     *        400:
     *          description: Bad request
     *
     */
    private async createShareLink(
        options: ApiHandlerOptions<ResumeShareCreateRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareCreateResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.CREATED,
                payload: await this.resumeShareService.createShareLink(id),
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async getShareLink(
        options: ApiHandlerOptions<ResumeShareGetRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareGetResponseDto | unknown>> {
        try {
            const id = options.params.id;
            const ip = options.socket.remoteAddress;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.getShareLink(id, ip),
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async getUserShareLinksWithResumes(
        options: ApiHandlerOptions<{
            user: User;
        }>,
    ): Promise<ApiHandlerResponse<GetUserResumeSharesResponse>> {
        try {
            const id = options.user.id;

            return {
                status: HttpCode.OK,
                payload:
                    await this.resumeShareCoordinator.getUserShareLinksWithResumes(
                        id,
                    ),
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async getShareLinkDetails(
        options: ApiHandlerOptions<ResumeShareDetailsGetRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareDetailsGetResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.getShareLinkDetails(id),
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async deleteShareLink(
        options: ApiHandlerOptions<ResumeShareDeleteRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareDeleteResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.deleteShareLink(id),
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async getResumeShareRecordByResumeId(
        options: ApiHandlerOptions<ResumeShareDetailsGetRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.OK,
                payload:
                    await this.resumeShareService.getResumeShareRecordByResumeId(
                        id,
                    ),
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }
}

export { ResumeShareController };
