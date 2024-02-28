import { Guid as guid } from 'guid-typescript';

import {
    type CertificationRepository,
    type ContactsRepository,
    type CustomSectionRepository,
    type EducationRepository,
    type ExperienceRepository,
    type LanguageRepository,
    type PersonalInformationRepository,
    type TechnicalSkillsRepository,
} from './content/content.js';
import { type IResumeRepository } from './interfaces/interfaces.js';
import { type ResumeModel } from './resume.model.js';
import {
    type Resume,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
} from './types/types.js';

interface ResumeRepositoryConfiguration {
    resumeModel: typeof ResumeModel;
    contactsRepository: ContactsRepository;
    educationRepository: EducationRepository;
    experienceRepository: ExperienceRepository;
    personalInformationRepository: PersonalInformationRepository;
    technicalSkillsRepository: TechnicalSkillsRepository;
    certificationRepository: CertificationRepository;
    languageRepository: LanguageRepository;
    customSectionRepository: CustomSectionRepository;
}

class ResumeRepository implements IResumeRepository {
    private resumeModel: typeof ResumeModel;
    private contactsRepository: ContactsRepository;
    private educationRepository: EducationRepository;
    private experienceRepository: ExperienceRepository;
    private personalInformationRepository: PersonalInformationRepository;
    private technicalSkillsRepository: TechnicalSkillsRepository;
    private certificationRepository: CertificationRepository;
    private languageRepository: LanguageRepository;
    private customSectionRepository: CustomSectionRepository;

    public constructor(configuration: ResumeRepositoryConfiguration) {
        this.resumeModel = configuration.resumeModel;
        this.contactsRepository = configuration.contactsRepository;
        this.educationRepository = configuration.educationRepository;
        this.experienceRepository = configuration.experienceRepository;
        this.personalInformationRepository =
            configuration.personalInformationRepository;
        this.technicalSkillsRepository =
            configuration.technicalSkillsRepository;
        this.certificationRepository = configuration.certificationRepository;
        this.languageRepository = configuration.languageRepository;
        this.customSectionRepository = configuration.customSectionRepository;
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
            certification,
            languages,
            customSections,
            ...resumeData
        } = resume;

        return {
            resume: resumeData,
            education: education ?? [],
            experience: experience ?? [],
            technicalSkills: technicalSkills ?? [],
            contacts: contacts ?? null,
            personalInformation: personalInformation ?? null,
            certification: certification ?? [],
            languages: languages ?? [],
            customSections: customSections ?? [],
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
                certification,
                languages,
                customSections,
                ...resumeData
            } = resume;

            return {
                resume: resumeData,
                education: education ?? [],
                experience: experience ?? [],
                technicalSkills: technicalSkills ?? [],
                contacts: contacts ?? null,
                personalInformation: personalInformation ?? null,
                certification: certification ?? [],
                languages: languages ?? [],
                customSections: customSections ?? [],
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
                certification,
                languages,
                customSections,
                ...resumeData
            } = resume;

            return {
                resume: resumeData,
                education: education ?? [],
                experience: experience ?? [],
                technicalSkills: technicalSkills ?? [],
                contacts: contacts ?? null,
                personalInformation: personalInformation ?? null,
                certification: certification ?? [],
                languages: languages ?? [],
                customSections: customSections ?? [],
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
                .insert({
                    ...payload.resume,
                    id: guid.raw(),
                })
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

            const certification = await Promise.all(
                payload.certification.map((cert) =>
                    this.certificationRepository.create(
                        resume.id,
                        cert,
                        transaction,
                    ),
                ),
            );

            const languages = await Promise.all(
                payload.languages.map((lang) =>
                    this.languageRepository.create(
                        resume.id,
                        lang,
                        transaction,
                    ),
                ),
            );

            const customSections = await Promise.all(
                payload.customSections.map((section) =>
                    this.customSectionRepository.create(
                        resume.id,
                        section,
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
                certification,
                languages,
                customSections,
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

            const certification = await Promise.all(
                data.certification.map((cert) => {
                    if (cert.id === undefined) {
                        throw new Error('Certification id is undefined');
                    }
                    return this.certificationRepository.update(
                        cert.id,
                        cert,
                        transaction,
                    );
                }),
            );

            const languages = await Promise.all(
                data.languages.map((lang) => {
                    if (lang.id === undefined) {
                        throw new Error('Language id is undefined');
                    }
                    return this.languageRepository.update(
                        lang.id,
                        lang,
                        transaction,
                    );
                }),
            );

            const customSections = await Promise.all(
                data.customSections.map((section) => {
                    if (section.id === undefined) {
                        throw new Error('Custom section id is undefined');
                    }
                    return this.customSectionRepository.update(
                        section.id,
                        section,
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
                certification,
                languages,
                customSections,
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
            await this.certificationRepository.delete(id, transaction);

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
