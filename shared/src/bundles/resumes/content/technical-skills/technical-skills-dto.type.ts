import { type SkillLevel } from './technical-skills-level.enum';

type TechnicalSkill = {
    id: string;
    skillName: string;
    skillLevel: SkillLevel;
    resumeId: string;
    createdAt: string;
    updatedAt: string;
};

export { type TechnicalSkill };
