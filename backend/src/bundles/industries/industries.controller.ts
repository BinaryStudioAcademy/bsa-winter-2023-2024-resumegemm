import {
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { IndustriesApiPath } from './enums/enums.js';
import { type IndustriesService } from './industries.service.js';
import { type IIndustriesController, type Industry } from './types/types';

class IndustriesController extends Controller implements IIndustriesController {
    private industriesService: IndustriesService;

    public constructor(logger: ILogger, industriesService: IndustriesService) {
        super(logger, ApiPath.INDUSTRIES);
        this.industriesService = industriesService;
        this.addRoute({
            path: IndustriesApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });
    }

    public async findAll(): Promise<ApiHandlerResponse<Industry[]>> {
        try {
            const industries = await this.industriesService.findAll();

            return {
                status: HttpCode.OK,
                payload: industries,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: {
                    message: (error as Error).message,
                },
            };
        }
    }
}

export { IndustriesController };
