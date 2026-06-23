import { Plus, Trash2 } from "lucide-react";

type CvSkillsActionsProps = {
    onAddSkill?: () => void;
    onRemoveSkills?: () => void;
};

export const CvSkillsActions = ({
                                    onAddSkill,
                                    onRemoveSkills,
                                }: CvSkillsActionsProps) => {
    return (
        <div className="mt-[72px] flex flex-col items-center justify-center gap-6 pb-10 md:flex-row md:gap-[96px]">
            <button
                type="button"
                onClick={onAddSkill}
                className="flex items-center gap-6 text-[18px] font-medium uppercase leading-[24.5px] tracking-[0.4px] text-black/45 transition hover:text-black/70"
            >
                <Plus size={28} strokeWidth={2} />
                ADD SKILL
            </button>

            <button
                type="button"
                onClick={onRemoveSkills}
                className="flex items-center gap-6 text-[18px] font-medium uppercase leading-[24.5px] tracking-[0.4px] text-[#C63031] transition hover:text-[#A82728]"
            >
                <Trash2 size={28} strokeWidth={2.4} />
                REMOVE SKILLS
            </button>
        </div>
    );
};