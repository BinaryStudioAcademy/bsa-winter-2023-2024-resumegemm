import {
    type IProfileService,
    type UserWithProfileRelation,
} from 'shared/build/index.js';
import { ProfileApiPath } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.package.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type FileUploadRequestDto } from '~/common/files/types/file-upload-request-dto.type.js';
import { type HTTPError, HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

class ProfileController extends Controller {
    private profileService: IProfileService;

    public constructor(logger: ILogger, profileService: IProfileService) {
        super(logger, ApiPath.PROFILE);

        this.profileService = profileService;

        this.addRoute({
            path: ProfileApiPath.UPLOAD_AVATAR,
            method: 'POST',
            handler: (options) =>
                this.uploadAvatar(
                    options as ApiHandlerOptions<{
                        user: UserWithProfileRelation;
                        fileBuffer: FileUploadRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: ProfileApiPath.DELETE_AVATAR,
            method: 'DELETE',
            handler: (options) =>
                this.deleteAvatar(
                    options as ApiHandlerOptions<{
                        user: UserWithProfileRelation;
                    }>,
                ),
        });
    }

    private async uploadAvatar(
        options: ApiHandlerOptions<{
            user: UserWithProfileRelation;
            fileBuffer: FileUploadRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<{ avatar: string }>> {
        try {
            const { fileBuffer, user } = options;

            const { url } = await this.profileService.uploadAvatar({
                fileBuffer,
                id: user.userProfile.id,
            });

            return {
                status: HttpCode.OK,
                payload: { avatar: url },
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

    private async deleteAvatar(
        options: ApiHandlerOptions<{
            user: UserWithProfileRelation;
        }>,
    ): Promise<ApiHandlerResponse<{ avatar: null }>> {
        try {
            const { user } = options;

            await this.profileService.deleteAvatar(user.userProfile.id);

            return {
                status: HttpCode.OK,
                payload: { avatar: null },
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

export { ProfileController };
