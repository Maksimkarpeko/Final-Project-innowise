"use client";

import { X } from "lucide-react";

import type { CVProject } from "../../model/projects/types";
import { useLocale } from "@/src/shared";

type CvRemoveProjectModalProps = {
  open: boolean;
  project: CVProject | null;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

export const CvRemoveProjectModal = ({
  open,
  project,
  isLoading,
  onCancel,
  onConfirm,
}: CvRemoveProjectModalProps) => {
  const { t } = useLocale();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[560px] rounded-[4px] bg-white px-[28px] pb-[24px] pt-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
        <div className="mb-[28px] flex items-center justify-between">
          <h2 className="font-roboto text-[24px] font-medium leading-[32px] text-[#2E2E2E]">
            {t.cv.projects.modal.removeTitle}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center text-[#767676] transition hover:text-[#2E2E2E]"
          >
            <X size={30} strokeWidth={1.8} />
          </button>
        </div>

        <p className="mb-[32px] font-roboto text-[18px] font-normal leading-[28px] text-[#2E2E2E]">
          {t.cv.projects.modal.removeConfirm}{" "}
          <span className="font-medium">{project?.name}</span>?
        </p>

        <div className="flex items-center justify-end gap-[16px]">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
                            h-[48px]
                            w-[180px]
                            rounded-[40px]
                            border
                            border-[#D9D9D9]
                            bg-white
                            font-roboto
                            text-[14px]
                            font-medium
                            uppercase
                            leading-[24.5px]
                            tracking-[0.4px]
                            text-[#767676]
                            transition
                            hover:bg-black/5
                            disabled:opacity-50
                        "
          >
            {t.common.cancel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
                            h-[48px]
                            w-[180px]
                            rounded-[40px]
                            border-none
                            bg-[#D9363E]
                            font-roboto
                            text-[14px]
                            font-medium
                            uppercase
                            leading-[24.5px]
                            tracking-[0.4px]
                            text-white
                            shadow-[0_2px_4px_rgba(0,0,0,0.25)]
                            transition
                            hover:bg-[#C63031]
                            disabled:opacity-50
                        "
          >
            {t.common.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};
