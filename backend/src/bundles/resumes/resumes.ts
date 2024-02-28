import { logger } from '~/common/logger/logger.js';

import {
    CertificationModel,
    CertificationRepository,
    ContactsModel,
    ContactsRepository,
    CustomSectionModel,
    CustomSectionRepository,
    EducationModel,
    EducationRepository,
    ExperienceModel,
    ExperienceRepository,
    LanguageModel,
    LanguageRepository,
    PersonalInformationModel,
    PersonalInformationRepository,
    TechnicalSkillModel,
    TechnicalSkillsRepository,
} from './content/content.js';
import { ResumeController } from './resume.controller.js';
import { ResumeModel } from './resume.model.js';
import { ResumeRepository } from './resume.repository.js';
import { ResumeService } from './resume.service.js';

const contactsRepository = new ContactsRepository(ContactsModel);
const educationRepository = new EducationRepository(EducationModel);
const experienceRepository = new ExperienceRepository(ExperienceModel);
const personalInformationRepository = new PersonalInformationRepository(
    PersonalInformationModel,
);
const technicalSkillsRepository = new TechnicalSkillsRepository(
    TechnicalSkillModel,
);
const certificationRepository = new CertificationRepository(CertificationModel);
const languageRepository = new LanguageRepository(LanguageModel);
const customSectionRepository = new CustomSectionRepository(CustomSectionModel);

const resumeRepository = new ResumeRepository({
    resumeModel: ResumeModel,
    contactsRepository,
    educationRepository,
    experienceRepository,
    personalInformationRepository,
    technicalSkillsRepository,
    certificationRepository,
    languageRepository,
    customSectionRepository,
});

const resumeService = new ResumeService(resumeRepository);

const resumeController = new ResumeController(logger, resumeService);

export { resumeController, resumeService };
export { ResumeModel } from './resume.model.js';
