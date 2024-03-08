import { type FastifyRequest } from 'fastify';
import {
    type UpdateUserProfileAndEmailRequestDto,
    type UserEntityFields,
    type UserWithProfileRelation,
    HTTPError,
} from 'shared/build/index.js';

import { type UserService } from '~/bundles/users/user.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';
import { type UserGetAllResponseDto } from './types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 */
class UserController extends Controller {
    private userService: UserService;

    public constructor(logger: ILogger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        headers: FastifyRequest['headers'];
                    }>,
                ),
        });

        this.addRoute({
            path: UsersApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.updateUserProfileAndEmail(
                    options as ApiHandlerOptions<{
                        body: UpdateUserProfileAndEmailRequestDto;
                        params: {
                            id: string;
                        };
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /users:
     *    get:
     *      description: Returns an array of users
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/User'
     */
    private async findAll(): Promise<
        ApiHandlerResponse<UserGetAllResponseDto>
    > {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }

    /**
     * @swagger
     * /users/$id:
     *   delete:
     *     description: Delete current user
     *     responses:
     *       200:
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserEntityFields'
     *       400:
     *         description: Bad request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *               example:
     *                 message: User's id is invalid.
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *               example:
     *                 message: User not found.
     */
    private async delete({
        headers,
    }: ApiHandlerOptions<{
        headers: FastifyRequest['headers'];
    }>): Promise<ApiHandlerResponse<UserEntityFields>> {
        try {
            const payload = await this.userService.delete(headers);
            return {
                status: HttpCode.OK,
                payload,
            };
        } catch (error: unknown) {
            return error instanceof HTTPError
                ? {
                      status: error.status,
                      payload: {
                          message: error.message,
                      },
                  }
                : {
                      status: HttpCode.INTERNAL_SERVER_ERROR,
                      payload: {
                          message: 'Internal server error.',
                      },
                  };
        }
    }

    private async updateUserProfileAndEmail(
        options: ApiHandlerOptions<{
            body: UpdateUserProfileAndEmailRequestDto;
            params: {
                id: string;
            };
        }>,
    ): Promise<ApiHandlerResponse<UserWithProfileRelation>> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.updateUserProfileAndEmail(
                options.params.id,
                options.body,
            ),
        };
    }
}

export { UserController };
