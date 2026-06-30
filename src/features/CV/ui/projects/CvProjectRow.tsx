"use client";

import { Dropdown } from "antd";
import { MoreVertical } from "lucide-react";

import type { CVProject } from "../../model/projects/types";
import { formatLocalizedProjectDate, useLocale } from "@/src/shared";

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
  const { t, locale } = useLocale();
  const tillNowLabel = t.cv.projects.date.tillNow;

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
          {formatLocalizedProjectDate(
            project.start_date,
            locale,
            tillNowLabel,
          )}
        </div>

        <div className="font-roboto text-[15px] font-normal leading-[24px] text-[#2E2E2E]">
          {formatLocalizedProjectDate(project.end_date, locale, tillNowLabel)}
        </div>

        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "edit",
                label: t.common.edit,
                onClick: () => onEdit(project),
              },
              {
                key: "remove",
                label: t.common.remove,
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
