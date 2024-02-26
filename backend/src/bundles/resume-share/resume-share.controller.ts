import {
    type HttpError,
    type ResumeShareCreateRequestDto,
    type ResumeShareCreateResponseDto,
    ResumesApiPath,
} from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type ResumeShareService } from './resume-share.service.js';

class ResumeShareController extends Controller {
    private resumeShareService: ResumeShareService;

    public constructor(
        logger: ILogger,
        resumeShareService: ResumeShareService,
    ) {
        super(logger, ApiPath.RESUMES);

        this.resumeShareService = resumeShareService;

        this.addRoute({
            path: ResumesApiPath.SHARE,
            method: 'POST',
            validation: {},
            handler: (options) =>
                this.GetShareLink(
                    options as ApiHandlerOptions<ResumeShareCreateRequestDto>,
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
    private async GetShareLink(
        options: ApiHandlerOptions<ResumeShareCreateRequestDto>,
    ): Promise<ApiHandlerResponse<ResumeShareCreateResponseDto | unknown>> {
        try {
            const id = options.params.id;

            return {
                status: HttpCode.OK,
                payload: await this.resumeShareService.GetShareLink(id),
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
