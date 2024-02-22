import { type FastifyRequest } from 'fastify';
import { type UserEntityFields,HttpError } from 'shared/build/index.js';

import { type UserService } from '~/bundles/users/user.service.js';
import { type ApiHandlerOptions, type ApiHandlerResponse,Controller } from '~/common/controller/controller.js';
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
            path: '/:id',
            method: 'DELETE',
            handler: (options) =>
                        this.delete(
                            options as ApiHandlerOptions<{
                                params: FastifyRequest['params'];
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
     *     description: Delete a user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID of the user to be deleted
     *         required: true
     *         schema:
     *           type: string
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
     *                 message: Input request parameters are invalid.
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
    private async delete ({
        params,
    }: ApiHandlerOptions<{
        params: FastifyRequest['params'];
    }>): Promise<ApiHandlerResponse<UserEntityFields>> {
        try{
            const payload = await this.userService.delete(
                (params as Record<'id', string>).id
            );
            return {
                status: HttpCode.OK,
                payload
            };
        } catch(error: unknown) {
            return error instanceof HttpError ? {
                    status: error.status,
                    payload: {
                        message: error.message
                    }
                } : {
                    status: HttpCode.INTERNAL_SERVER_ERROR,
                    payload: {
                        message: 'Internal server error.'
                    }
                };
        }
    }
}

export { UserController };
