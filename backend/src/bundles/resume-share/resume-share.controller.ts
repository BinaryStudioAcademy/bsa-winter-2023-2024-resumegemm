import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type HttpError, HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { ResumeApiPath } from './enums/enums.js';
import { type ResumeShareService } from './resume-share.service.js';
import {
    type ResumeShareCreateRequestDto,
    type ResumeShareCreateResponseDto,
    type ResumeShareDeleteRequestDto,
    type ResumeShareDeleteResponseDto,
    type ResumeShareDetailsGetRequestDto,
    type ResumeShareDetailsGetResponseDto,
    type ResumeShareGetRequestDto,
    type ResumeShareGetResponseDto,
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

    public constructor(
        logger: ILogger,
        resumeShareService: ResumeShareService,
    ) {
        super(logger, ApiPath.RESUMES);

        this.resumeShareService = resumeShareService;

        this.addRoute({
            path: ResumeApiPath.ID_SHARE(),
            method: 'POST',
            validation: {},
            handler: (options) =>
                this.CreateShareLink(
                    options as ApiHandlerOptions<ResumeShareCreateRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumeApiPath.SHARE_ID(),
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.GetShareLink(
                    options as ApiHandlerOptions<ResumeShareGetRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumeApiPath.SHARE_ID(),
            method: 'DELETE',
            validation: {},
            handler: (options) =>
                this.DeleteShareLink(
                    options as ApiHandlerOptions<ResumeShareDeleteRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumeApiPath.SHARE_ID_DETAILS(),
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.GetShareLinkDetails(
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
    private async CreateShareLink(
        options: ApiHandlerOptions<ResumeShareCreateRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareCreateResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.CREATED,
                payload: await this.resumeShareService.CreateShareLink(id),
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async GetShareLink(
        options: ApiHandlerOptions<ResumeShareGetRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareGetResponseDto | unknown>> {
        try {
            const id = options.params.id;
            const ip = options.socket.remoteAddress;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.GetShareLink(id, ip),
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async GetShareLinkDetails(
        options: ApiHandlerOptions<ResumeShareDetailsGetRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareDetailsGetResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.GetShareLinkDetails(id),
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async DeleteShareLink(
        options: ApiHandlerOptions<ResumeShareDeleteRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareDeleteResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.DeleteShareLink(id),
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
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
