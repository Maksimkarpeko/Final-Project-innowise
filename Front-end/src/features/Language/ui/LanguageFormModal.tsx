"use client";

import { Button, Modal, Select } from "antd";
import { X } from "lucide-react";
import {
    type LanguageProficiency,
    getProficiencyOptions,
    useLocale,
} from "@/src/shared";
import { LanguageOption } from "../model/language.types";

type LanguageFormModalProps = {
    title: string;
    open: boolean;
    languageValue?: string;
    proficiencyValue: LanguageProficiency["proficiency"];
    languageOptions: LanguageOption[];
    languageDisabled?: boolean;
    languageLoading?: boolean;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onLanguageChange?: (value: string) => void;
    onProficiencyChange: (value: LanguageProficiency["proficiency"]) => void;
};

const selectClassName = `
  w-full

  [&_.ant-select-selector]:!bg-white
  [&_.ant-select-selector]:!border-[#d9d9d9]
  dark:[&_.ant-select-selector]:!bg-[#303030]
  dark:[&_.ant-select-selector]:!border-white/20

  [&_.ant-select-selection-item]:!text-[#2e2e2e]
  dark:[&_.ant-select-selection-item]:!text-white/90

  [&_.ant-select-selection-placeholder]:!text-[#767676]
  dark:[&_.ant-select-selection-placeholder]:!text-white/40

  [&_.ant-select-arrow]:!text-[#767676]
  dark:[&_.ant-select-arrow]:!text-white/60

  [&.ant-select-disabled_.ant-select-selector]:!bg-white
  [&.ant-select-disabled_.ant-select-selection-item]:!text-[#8c8c8c]
  dark:[&.ant-select-disabled_.ant-select-selector]:!bg-[#303030]
  dark:[&.ant-select-disabled_.ant-select-selection-item]:!text-white/45
`;

const selectPopupClassName = `
  bg-white
  dark:bg-[#303030]

  [&_.ant-select-item]:!text-[#2e2e2e]
  dark:[&_.ant-select-item]:!text-white/80

  [&_.ant-select-item-option-active]:!bg-black/5
  dark:[&_.ant-select-item-option-active]:!bg-white/10

  [&_.ant-select-item-option-selected]:!bg-black/10
  dark:[&_.ant-select-item-option-selected]:!bg-white/15
`;

export const LanguageFormModal = ({
                                      title,
                                      open,
                                      languageValue,
                                      proficiencyValue,
                                      languageOptions,
                                      languageDisabled = false,
                                      languageLoading = false,
                                      confirmLoading = false,
                                      confirmDisabled = false,
                                      onCancel,
                                      onConfirm,
                                      onLanguageChange,
                                      onProficiencyChange,
                                  }: LanguageFormModalProps) => {
    const { t } = useLocale();

    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closeIcon={
                <X
                    size={20}
                    className="text-[#767676] transition-colors dark:text-white/60"
                />
            }
            className="
        [&_.ant-modal-content]:!bg-white
        dark:[&_.ant-modal-content]:!bg-[#303030]

        [&_.ant-modal-header]:!bg-white
        dark:[&_.ant-modal-header]:!bg-[#303030]

        [&_.ant-modal-title]:!text-[#2e2e2e]
        dark:[&_.ant-modal-title]:!text-white/90

        [&_.ant-modal-close]:!text-[#767676]
        dark:[&_.ant-modal-close]:!text-white/60
      "
        >
            <div className="flex flex-col gap-5 pt-4">
                <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#6f6f6f] transition-colors dark:text-white/60">
            {t.languages.form.languageLabel}
          </span>

                    <Select
                        showSearch={!languageDisabled}
                        disabled={languageDisabled}
                        loading={languageLoading}
                        value={languageValue}
                        placeholder={t.languages.form.languagePlaceholder}
                        options={languageOptions}
                        onChange={onLanguageChange}
                        optionFilterProp="label"
                        className={selectClassName}
                        popupClassName={selectPopupClassName}
                    />
                </div>

                <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#6f6f6f] transition-colors dark:text-white/60">
            {t.languages.form.proficiencyLabel}
          </span>

                    <Select
                        value={proficiencyValue}
                        options={getProficiencyOptions(t)}
                        onChange={onProficiencyChange}
                        className={selectClassName}
                        popupClassName={selectPopupClassName}
                    />
                </div>

                <div className="mt-4 flex gap-3">
                    <Button
                        type="text"
                        onClick={onCancel}
                        className="
              h-11!
              flex-1!
              rounded-[40px]!
              border!
              border-[#D9D9D9]!
              bg-transparent!
              text-[14px]!
              font-semibold!
              uppercase!
              text-[#888888]!
              transition-colors!

              hover:border-[#BDBDBD]!
              hover:bg-gray-100!
              hover:text-[#2E2E2E]!

              dark:border-white/20!
              dark:bg-transparent!
              dark:text-white/55!

              dark:hover:border-white/25!
              dark:hover:bg-white/8!
              dark:hover:text-white/75!
            "
                    >
                        {t.common.cancel}
                    </Button>

                    <Button
                        type="primary"
                        loading={confirmLoading}
                        disabled={confirmDisabled}
                        onClick={onConfirm}
                        className="
              h-11!
              flex-1!
              rounded-[40px]!
              border-none!
              bg-[#d32f2f]!
              text-[14px]!
              font-semibold!
              uppercase!
              text-white!

              hover:bg-[#b71c1c]!
              hover:text-white!

              disabled:bg-[#d1d5db]!

              dark:bg-[#d32f2f]!
              dark:text-white!

              dark:hover:bg-[#b71c1c]!
              dark:hover:text-white!

              dark:disabled:bg-white/14!
              dark:disabled:text-white/45!
            "
                    >
                        {t.common.confirm}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};