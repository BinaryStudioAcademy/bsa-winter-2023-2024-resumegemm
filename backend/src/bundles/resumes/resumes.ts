import { logger } from '~/common/logger/logger.js';

import {
    ContactsModel,
    ContactsRepository,
    EducationModel,
    EducationRepository,
    ExperienceModel,
    ExperienceRepository,
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

const resumeRepository = new ResumeRepository({
    resumeModel: ResumeModel,
    contactsRepository,
    educationRepository,
    experienceRepository,
    personalInformationRepository,
    technicalSkillsRepository,
});

const resumeService = new ResumeService(resumeRepository);

const resumeController = new ResumeController(logger, resumeService);

export { resumeController, resumeService };
export { ResumeModel } from './resume.model.js';
