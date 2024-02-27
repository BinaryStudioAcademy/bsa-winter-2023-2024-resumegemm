import {
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
} from 'shared/build/index.js';

import {
    type IResumeRepository,
    type IResumeService,
} from './interfaces/interfaces.js';
import { type Resume } from './types/types.js';

class ResumeService implements IResumeService {
    private resumeRepository: IResumeRepository;

    public constructor(resumeRepository: IResumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }

    public async findWithRelations(
        id: string,
    ): Promise<ResumeGetItemResponseDto | undefined> {
        return await this.resumeRepository.findWithRelations(id);
    }

    public async findAll(): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAll();
    }

    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAllByUserId(userId);
    }

    public async create(
        payload: ResumeCreateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto> {
        return await this.resumeRepository.create(payload);
    }

    public async update(
        id: string,
        data: ResumeUpdateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto> {
        return await this.resumeRepository.update(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.resumeRepository.delete(id);
    }
}

export { ResumeService };
