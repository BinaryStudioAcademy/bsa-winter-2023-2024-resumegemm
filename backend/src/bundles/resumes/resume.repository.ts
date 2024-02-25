import crypto from 'node:crypto';

import { type Transaction } from 'objection';

import { type ResumeModel } from './resume.model';
import {
    type Resume,
    type ResumeGetAllResponseDto,
    type ResumeUpdateItemRequestDto,
} from './types/resume.type';
import { type IResumeRepository } from './types/resume-repository.type';

class ResumeRepository implements IResumeRepository {
    private resumeModel: typeof ResumeModel;

    public constructor(resumeModel: typeof ResumeModel) {
        this.resumeModel = resumeModel;
    }
    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeModel.query().findById(id);
    }

    public async findAll(): Promise<ResumeGetAllResponseDto> {
        const response = await this.resumeModel.query();
        return {
            resumes: response,
        };
    }

    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto> {
        const response = await this.resumeModel
            .query()
            .where('user_id', userId);
        return {
            resumes: response,
        };
    }

    public async create(
        payload: Resume,
        transaction?: Transaction,
    ): Promise<Resume> {
        payload.id = crypto.randomUUID();
        return await this.resumeModel
            .query(transaction)
            .insert(payload)
            .returning('*');
    }

    public async update(
        id: string,
        data: ResumeUpdateItemRequestDto,
        transaction?: Transaction,
    ): Promise<Resume> {
        return await this.resumeModel
            .query(transaction)
            .updateAndFetchById(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        const response = await this.resumeModel.query().deleteById(id);
        return response === 1 ? true : false;
    }
}

export { ResumeRepository };
