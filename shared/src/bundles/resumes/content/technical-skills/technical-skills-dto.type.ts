import { type SkillLevel } from './technical-skills-level.enum';

type TechnicalSkill = {
    id: string;
    name: string;
    level: SkillLevel;
    resumeId: string;
    createdAt: string;
    updatedAt: string;
};

export { type TechnicalSkill };
