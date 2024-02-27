import {
    type ContactsRepository,
    type EducationRepository,
    type ExperienceRepository,
    type PersonalInformationRepository,
    type TechnicalSkillsRepository,
} from './content/content.js';
import { type ResumeModel } from './resume.model';
import {
    type Resume,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
} from './types/resume.type';
import { type IResumeRepository } from './types/resume-repository.type';

interface ResumeRepositoryConfiguration {
    resumeModel: typeof ResumeModel;
    contactsRepository: ContactsRepository;
    educationRepository: EducationRepository;
    experienceRepository: ExperienceRepository;
    personalInformationRepository: PersonalInformationRepository;
    technicalSkillsRepository: TechnicalSkillsRepository;
}

class ResumeRepository implements IResumeRepository {
    private resumeModel: typeof ResumeModel;
    private contactsRepository: ContactsRepository;
    private educationRepository: EducationRepository;
    private experienceRepository: ExperienceRepository;
    private personalInformationRepository: PersonalInformationRepository;
    private technicalSkillsRepository: TechnicalSkillsRepository;

    public constructor(configuration: ResumeRepositoryConfiguration) {
        this.resumeModel = configuration.resumeModel;
        this.contactsRepository = configuration.contactsRepository;
        this.educationRepository = configuration.educationRepository;
        this.experienceRepository = configuration.experienceRepository;
        this.personalInformationRepository =
            configuration.personalInformationRepository;
        this.technicalSkillsRepository =
            configuration.technicalSkillsRepository;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeModel.query().findById(id);
    }

    public async findWithRelations(
        id: string,
    ): Promise<ResumeGetItemResponseDto | undefined> {
        const resume = await this.resumeModel
            .query()
            .findById(id)
            .withGraphFetched(
                '[education, experience, technicalSkills, contacts, personalInformation]',
            );

        if (!resume) {
            return undefined;
        }

        const {
            education,
            experience,
            technicalSkills,
            contacts,
            personalInformation,
            ...resumeData
        } = resume;

        return {
            resume: resumeData,
            education: education ?? [],
            experience: experience ?? [],
            technicalSkills: technicalSkills ?? [],
            contacts: contacts ?? null,
            personalInformation: personalInformation ?? null,
        };
    }

    public async findAll(): Promise<ResumeGetAllResponseDto> {
        const resumes = await this.resumeModel
            .query()
            .withGraphFetched(
                '[education, experience, technicalSkills, contacts, personalInformation]',
            );

        const response: ResumeGetItemResponseDto[] = resumes.map((resume) => {
            const {
                education,
                experience,
                technicalSkills,
                contacts,
                personalInformation,
                ...resumeData
            } = resume;

            return {
                resume: resumeData,
                education: education ?? [],
                experience: experience ?? [],
                technicalSkills: technicalSkills ?? [],
                contacts: contacts ?? null,
                personalInformation: personalInformation ?? null,
            };
        });

        return {
            resumes: response,
        };
    }

    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto> {
        const resumes = await this.resumeModel.query().where('user_id', userId);

        const response: ResumeGetItemResponseDto[] = resumes.map((resume) => {
            const {
                education,
                experience,
                technicalSkills,
                contacts,
                personalInformation,
                ...resumeData
            } = resume;

            return {
                resume: resumeData,
                education: education ?? [],
                experience: experience ?? [],
                technicalSkills: technicalSkills ?? [],
                contacts: contacts ?? null,
                personalInformation: personalInformation ?? null,
            };
        });

        return {
            resumes: response,
        };
    }

    public async create(
        payload: ResumeCreateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto> {
        const transaction = await this.resumeModel.startTransaction();

        try {
            const resume = await this.resumeModel
                .query(transaction)
                .insert(payload.resume)
                .returning('*');

            const contacts = await this.contactsRepository.create(
                resume.id,
                payload.contacts,
                transaction,
            );

            const personalInformation =
                await this.personalInformationRepository.create(
                    resume.id,
                    payload.personalInformation,
                    transaction,
                );

            const education = await Promise.all(
                payload.education.map((edu) =>
                    this.educationRepository.create(
                        resume.id,
                        edu,
                        transaction,
                    ),
                ),
            );

            const experience = await Promise.all(
                payload.experience.map((exp) =>
                    this.experienceRepository.create(
                        resume.id,
                        exp,
                        transaction,
                    ),
                ),
            );

            const technicalSkills = await Promise.all(
                payload.technicalSkills.map((skill) =>
                    this.technicalSkillsRepository.create(
                        resume.id,
                        skill,
                        transaction,
                    ),
                ),
            );

            await transaction.commit();

            return {
                resume,
                education,
                experience,
                technicalSkills,
                contacts,
                personalInformation,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    public async update(
        id: string,
        data: ResumeUpdateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto> {
        const transaction = await this.resumeModel.startTransaction();

        try {
            const resume = await this.resumeModel
                .query(transaction)
                .patchAndFetchById(id, data.resume);

            const contacts = await this.contactsRepository.update(
                resume.id,
                data.contacts,
                transaction,
            );

            const personalInformation =
                await this.personalInformationRepository.update(
                    resume.id,
                    data.personalInformation,
                    transaction,
                );

            const education = await Promise.all(
                data.education.map((edu) => {
                    if (edu.id === undefined) {
                        throw new Error('Education id is undefined');
                    }

                    return this.educationRepository.update(
                        edu.id,
                        edu,
                        transaction,
                    );
                }),
            );

            const experience = await Promise.all(
                data.experience.map((exp) => {
                    if (exp.id === undefined) {
                        throw new Error('Experience id is undefined');
                    }

                    return this.experienceRepository.update(
                        exp.id,
                        exp,
                        transaction,
                    );
                }),
            );

            const technicalSkills = await Promise.all(
                data.technicalSkills.map((skill) => {
                    if (skill.id === undefined) {
                        throw new Error('Technical skill id is undefined');
                    }
                    return this.technicalSkillsRepository.update(
                        skill.id,
                        skill,
                        transaction,
                    );
                }),
            );

            await transaction.commit();

            return {
                resume,
                education,
                experience,
                technicalSkills,
                contacts,
                personalInformation,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // public async update(
    //     id: string,
    //     data: ResumeUpdateItemRequestDto,
    //     transaction?: Transaction,
    // ): Promise<Resume> {
    //     return await this.resumeModel
    //         .query(transaction)
    //         .updateAndFetchById(id, data);
    // }

    public async delete(id: string): Promise<boolean> {
        const transaction = await this.resumeModel.startTransaction();

        try {
            await this.educationRepository.delete(id, transaction);
            await this.experienceRepository.delete(id, transaction);
            await this.technicalSkillsRepository.delete(id, transaction);
            await this.personalInformationRepository.delete(id, transaction);
            await this.contactsRepository.delete(id, transaction);

            const response = await this.resumeModel.query().deleteById(id);

            await transaction.commit();

            return response === 1 ? true : false;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // public async delete(id: string): Promise<boolean> {
    //     const response = await this.resumeModel.query().deleteById(id);
    //     return response === 1 ? true : false;
    // }
}

export { ResumeRepository };
