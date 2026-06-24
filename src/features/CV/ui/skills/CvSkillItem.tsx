import { Checkbox } from "antd";

import type { CVSkill } from "../../model/types.skills";

import { CvSkillLevel } from "./CvSkillLevel";

type CvSkillItemProps = {
    skill: CVSkill;
    isRemoveMode: boolean;
    isSelected: boolean;
    onSelect: (skillName: string) => void;
};

export const CvSkillItem = ({
                                skill,
                                isRemoveMode,
                                isSelected,
                                onSelect,
                            }: CvSkillItemProps) => {
    return (
        <div className="flex h-[48px] w-full max-w-[284px] items-center gap-[24px] rounded-[40px] px-[16px]">
            {isRemoveMode && (
                <Checkbox
                    checked={isSelected}
                    onChange={() => onSelect(skill.name)}
                />
            )}

            <CvSkillLevel mastery={skill.mastery} />

            <span className="font-roboto text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#767676]">
                {skill.name}
            </span>
        </div>
    );
};