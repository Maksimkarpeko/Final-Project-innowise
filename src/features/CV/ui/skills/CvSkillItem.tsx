import { Checkbox } from "antd";

import type { CVSkill } from "../../model/skills/types.skills";

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
        <div
            onClick={() => isRemoveMode && onSelect(skill.name)}
            className={`
        flex
        h-[48px]
        w-full
        max-w-[284px]
        items-center
        gap-[24px]
        rounded-[40px]
        px-[16px]
        transition-colors

        ${isRemoveMode ? "cursor-pointer hover:bg-black/5 dark:hover:bg-white/[0.08]" : ""}

        ${isSelected ? "bg-black/5 dark:bg-white/10" : "bg-transparent"}
      `}
        >
            {isRemoveMode && (
                <Checkbox
                    checked={isSelected}
                    onChange={() => onSelect(skill.name)}
                    onClick={(event) => event.stopPropagation()}
                    className="
            [&_.ant-checkbox-inner]:!border-white/30
            [&_.ant-checkbox-inner]:!bg-transparent
            [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-[#D9363E]
            [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-[#D9363E]
          "
                />
            )}

            <CvSkillLevel mastery={skill.mastery} />

            <span className="font-roboto text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#767676] transition-colors dark:text-white/45">
        {skill.name}
      </span>
        </div>
    );
};