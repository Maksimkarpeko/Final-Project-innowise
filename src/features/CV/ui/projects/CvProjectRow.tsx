import { Dropdown } from "antd";
import { MoreVertical } from "lucide-react";

import type { CVProject } from "../../model/projects/types";
import { formatProjectDate } from "../../model/projects/formatProjectDate";

import { CvProjectChips } from "./CvProjectChips";

type CvProjectRowProps = {
    project: CVProject;
    onEdit: (project: CVProject) => void;
    onRemove: (project: CVProject) => void;
};

export const CvProjectRow = ({
                                 project,
                                 onEdit,
                                 onRemove,
                             }: CvProjectRowProps) => {
    return (
        <article className="border-t border-[#E0E0E0] py-[24px]">
            <div className="grid grid-cols-[1.1fr_1.1fr_0.7fr_0.7fr_32px] items-center gap-6">
                <div className="font-roboto text-[15px] font-medium leading-[24px] text-[#2E2E2E]">
                    {project.name}
                </div>

                <div className="font-roboto text-[15px] font-medium leading-[24px] text-[#2E2E2E]">
                    {project.domain}
                </div>

                <div className="font-roboto text-[15px] font-normal leading-[24px] text-[#2E2E2E]">
                    {formatProjectDate(project.start_date)}
                </div>

                <div className="font-roboto text-[15px] font-normal leading-[24px] text-[#2E2E2E]">
                    {formatProjectDate(project.end_date)}
                </div>

                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: "Edit",
                                onClick: () => onEdit(project),
                            },
                            {
                                key: "remove",
                                label: "Remove",
                                danger: true,
                                onClick: () => onRemove(project),
                            },
                        ],
                    }}
                >
                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#767676] transition hover:bg-black/5"
                    >
                        <MoreVertical size={20} />
                    </button>
                </Dropdown>
            </div>

            <p className="mt-[22px] font-roboto text-[15px] font-normal leading-[22px] tracking-[0.15px] text-[#767676]">
                {project.description}
            </p>

            <div className="mt-[14px]">
                <CvProjectChips items={project.responsibilities} />
            </div>
        </article>
    );
};