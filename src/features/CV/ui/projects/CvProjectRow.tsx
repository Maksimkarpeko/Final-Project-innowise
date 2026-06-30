"use client";

import { Dropdown } from "antd";
import { MoreVertical } from "lucide-react";

import { formatLocalizedProjectDate, useLocale } from "@/src/shared";

import type { CVProject } from "../../model/projects/types";

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
      <article className="border-t border-[#E0E0E0] py-[24px] transition-colors dark:border-white/10">
        <div className="grid grid-cols-[1.1fr_1.1fr_0.7fr_0.7fr_32px] items-center gap-6">
          <div className="font-roboto text-[15px] font-medium leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
            {project.name}
          </div>

          <div className="font-roboto text-[15px] font-medium leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
            {project.domain}
          </div>

          <div className="font-roboto text-[15px] font-normal leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/80">
            {formatLocalizedProjectDate(
                project.start_date,
                locale,
                tillNowLabel,
            )}
          </div>

          <div className="font-roboto text-[15px] font-normal leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/80">
            {formatLocalizedProjectDate(project.end_date, locale, tillNowLabel)}
          </div>

          <Dropdown
              trigger={["click"]}
              menu={{
                className: `
              [&_.ant-dropdown-menu]:!bg-white
              dark:[&_.ant-dropdown-menu]:!bg-[#303030]

              [&_.ant-dropdown-menu-item]:!text-[#2E2E2E]
              dark:[&_.ant-dropdown-menu-item]:!text-white/80

              dark:[&_.ant-dropdown-menu-item:hover]:!bg-white/10
              dark:[&_.ant-dropdown-menu-item-danger]:!text-[#ff4d4f]
            `,
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
                className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-[#767676]
              transition-colors

              hover:bg-black/5
              hover:text-[#2E2E2E]

              dark:text-white/75
              dark:hover:bg-white/10
              dark:hover:text-white
            "
            >
              <MoreVertical size={20} />
            </button>
          </Dropdown>
        </div>

        <p className="mt-[22px] font-roboto text-[15px] font-normal leading-[22px] tracking-[0.15px] text-[#767676] transition-colors dark:text-white/45">
          {project.description}
        </p>

        <div className="mt-[14px]">
          <CvProjectChips items={project.responsibilities} />
        </div>
      </article>
  );
};