import {
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeUpdateItemRequestDto,
} from 'shared/build';

import { type Resume } from './types/resume.type';
import { type IResumeRepository } from './types/resume-repository.type';
import { type IResumeService } from './types/resume-service.type';

class ResumeService implements IResumeService<Resume> {
    private resumeRepository: IResumeRepository;

    public constructor(resumeRepository: IResumeRepository) {
        this.resumeRepository = resumeRepository;
    }
    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }
    public async findAll(): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAll();
    }
    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAllByUserId(userId);
    }
    public async create(payload: ResumeCreateItemRequestDto): Promise<Resume> {
        return await this.resumeRepository.create(payload);
    }
    public async update(
        id: string,
        data: ResumeUpdateItemRequestDto,
    ): Promise<Resume> {
        return await this.resumeRepository.update(id, data);
    }
    public async delete(id: string): Promise<boolean> {
        return await this.resumeRepository.delete(id);
    }
}

export { ResumeService };
