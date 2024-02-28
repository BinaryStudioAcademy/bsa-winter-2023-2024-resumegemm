import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type HttpError, HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { ResumesApiPath } from './enums/enums.js';
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

class ResumeShareController extends Controller {
    private resumeShareService: ResumeShareService;

    public constructor(
        logger: ILogger,
        resumeShareService: ResumeShareService,
    ) {
        super(logger, ApiPath.RESUMES);

        this.resumeShareService = resumeShareService;

        this.addRoute({
            path: ResumesApiPath.ID_SHARE(),
            method: 'POST',
            validation: {},
            handler: (options) =>
                this.CreateShareLink(
                    options as ApiHandlerOptions<ResumeShareCreateRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE_ID(),
            method: 'GET',
            validation: {},
            handler: (options) =>
                this.GetShareLink(
                    options as ApiHandlerOptions<ResumeShareGetRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE_ID(),
            method: 'DELETE',
            validation: {},
            handler: (options) =>
                this.DeleteShareLink(
                    options as ApiHandlerOptions<ResumeShareDeleteRequestDto>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SHARE_ID_DETAILS(),
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
     * /auth/sign-up:
     *    post:
     *      description: Sign up user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                firstName:
     *                  type string
     *                lastName:
     *                  type string
     *                password:
     *                  type: string
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
     *                    $ref: '#/components/schemas/User'
     *        400:
     *           description: Email taken
     *  /auth/sign-in:
     *      post:
     *       description: Login user
     *       requestBody:
     *          description: User auth data
     *          required: true
     *       content:
     *        application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *       responses:
     *          200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     *        400:
     *           description: User not found
     *        401:
     *          description: Invalid email
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
