import { Button, Modal, Select } from "antd";
import { X } from "lucide-react";
import { Proficiency, type LanguageProficiency } from "@/src/shared";
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

const proficiencyOptions = Object.values(Proficiency);

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
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closeIcon={<X size={20} />}
        >
            <div className="flex flex-col gap-5 pt-4">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[#6f6f6f]">Language</span>

                    <Select
                        showSearch={!languageDisabled}
                        disabled={languageDisabled}
                        loading={languageLoading}
                        value={languageValue}
                        placeholder="Select language"
                        options={languageOptions}
                        onChange={onLanguageChange}
                        optionFilterProp="label"
                        className="w-full"
                    />
                </div>

                <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#6f6f6f]">
            Language proficiency
          </span>

                    <Select
                        value={proficiencyValue}
                        options={proficiencyOptions.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                        onChange={onProficiencyChange}
                        className="w-full"
                    />
                </div>

                <div className="mt-4 flex gap-3">
                    <Button
                        type="text"
                        onClick={onCancel}
                        className="!h-11 !flex-1 !rounded-[40px] !border !border-[#d1d5db] !text-[14px] !font-semibold !uppercase !text-[#7a7a7a]"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        loading={confirmLoading}
                        disabled={confirmDisabled}
                        onClick={onConfirm}
                        className="!h-11 !flex-1 !rounded-[40px] !bg-[#d32f2f] !text-[14px] !font-semibold !uppercase hover:!bg-[#b71c1c] disabled:!bg-[#d1d5db]"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
};