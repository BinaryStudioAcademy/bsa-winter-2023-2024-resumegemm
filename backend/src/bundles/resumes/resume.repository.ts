import { Guid as guid } from 'guid-typescript';

import { type FindAllOptions } from '~/common/types/types.js';

import {
    resumeGraphFetchRelations,
    resumeGraphFetchWithTemplates,
} from './constants/constants.js';
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
    type ResumeWithRelationsAndTemplateResponseDto,
} from './types/types.js';

const SORTING_FIELD = 'resume_title';
const RESUME_TITLE = 'LOWER(resume_title) LIKE ?';
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

    public async findById(
        id: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto | null> {
        const resume = await this.resumeModel
            .query()
            .findById(id)
            .withGraphFetched(resumeGraphFetchWithTemplates)
            .returning('*')
            .castTo<ResumeWithRelationsAndTemplateResponseDto>();

        return resume ?? null;
    }

    public async findAll(
        options?: FindAllOptions,
    ): Promise<ResumeGetAllResponseDto[]> {
        let query = this.resumeModel.query();

        if (options?.direction) {
            query = query.orderBy(SORTING_FIELD, options.direction);
        }

        if (options?.name) {
            const nameLower = options.name.toLowerCase();

            query = query.whereRaw('LOWER(resume_title) LIKE ?', [
                `%${nameLower}%`,
            ]);
        }

        return await query
            .withGraphFetched(resumeGraphFetchRelations)
            .returning('*')
            .castTo<ResumeGetAllResponseDto[]>();
    }

    public async findAllByUserId(
        userId: string,
        options?: FindAllOptions,
    ): Promise<ResumeGetAllResponseDto[]> {
        let query = this.resumeModel
            .query()
            .where('user_id', userId)
            .withGraphFetched(resumeGraphFetchRelations)
            .returning('*');

        if (options?.direction) {
            query = query.orderBy(SORTING_FIELD, options.direction);
        }

        if (options?.name) {
            const nameLower = options.name.toLowerCase();

            query = query.whereRaw(RESUME_TITLE, [`%${nameLower}%`]);
        }

        return await query.castTo<ResumeGetAllResponseDto[]>();
    }

    public async create(
        payload: ResumeCreateItemRequestDto,
        userId: string,
        templateId: string,
    ): Promise<ResumeGetItemResponseDto> {
        const transaction = await this.resumeModel.startTransaction();

        try {
            const resume = await this.resumeModel
                .query(transaction)
                .insert({
                    ...payload.resume,
                    templateId: templateId,
                    userId,
                    id: guid.raw(),
                })
                .returning('*');

            const contacts = await this.contactsRepository.create(
                resume.id,
                payload.contacts ?? {},
                transaction,
            );

            const personalInformation =
                await this.personalInformationRepository.create(
                    resume.id,
                    payload.personalInformation ?? {},
                    transaction,
                );

            const education = await Promise.all(
                payload.education
                    ? payload.education.map((edu) =>
                          this.educationRepository.create(
                              resume.id,
                              edu,
                              transaction,
                          ),
                      )
                    : [],
            );

            const experience = await Promise.all(
                payload.experience
                    ? payload.experience.map((exp) =>
                          this.experienceRepository.create(
                              resume.id,
                              exp,
                              transaction,
                          ),
                      )
                    : [],
            );

            const technicalSkills = await Promise.all(
                payload.technicalSkills
                    ? payload.technicalSkills.map((skill) =>
                          this.technicalSkillsRepository.create(
                              resume.id,
                              skill,
                              transaction,
                          ),
                      )
                    : [],
            );

            const certification = await Promise.all(
                payload.certification
                    ? payload.certification.map((cert) =>
                          this.certificationRepository.create(
                              resume.id,
                              cert,
                              transaction,
                          ),
                      )
                    : [],
            );

            const languages = await Promise.all(
                payload.languages
                    ? payload.languages.map((lang) =>
                          this.languageRepository.create(
                              resume.id,
                              lang,
                              transaction,
                          ),
                      )
                    : [],
            );

            const customSections = await Promise.all(
                payload.customSections
                    ? payload.customSections.map((section) =>
                          this.customSectionRepository.create(
                              resume.id,
                              section,
                              transaction,
                          ),
                      )
                    : [],
            );

            await transaction.commit();

            return {
                ...resume,
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
                ...resume,
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

    public async delete(id: string): Promise<boolean> {
        const subRepositories = [
            this.educationRepository,
            this.experienceRepository,
            this.technicalSkillsRepository,
            this.personalInformationRepository,
            this.contactsRepository,
            this.certificationRepository,
            this.languageRepository,
            this.customSectionRepository,
        ];
        await Promise.all(
            subRepositories.map((repository) => repository.delete(id)),
        );
        await this.resumeModel.query().deleteById(id);

        return true;
    }

    public async findAllByUserIdWithoutRelations(
        userId: string,
        options?: FindAllOptions,
    ): Promise<Resume[]> {
        let query = this.resumeModel.query().where('user_id', userId);

        if (options?.direction) {
            query = query.orderBy(SORTING_FIELD, options.direction);
        }

        if (options?.name) {
            const nameLower = options.name.toLowerCase();

            query = query.whereRaw(RESUME_TITLE, [`%${nameLower}%`]);
        }

        return await query;
    }
}

export { ResumeRepository };
