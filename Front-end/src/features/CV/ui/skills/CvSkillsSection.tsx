"use client";

import { useMemo, useState } from "react";
import { Alert, Empty, Form, Modal, Select, Spin } from "antd";
import { Plus, Trash2, X } from "lucide-react";

import {
    getMasteryOptions,
    translateCategoryName,
    useLocale,
} from "@/src/shared";

import { useCVSkills } from "../../hooks/useCVSkills";
import { groupCVSkillsByCategory } from "../../model/skills/groupCVSkillsByCategory";
import type { CVSkill, Mastery } from "../../model/skills/types.skills";

import { CvSkillItem } from "./CvSkillItem";

type CvSkillsSectionProps = {
    cvId: string;
};

type AddSkillFormValues = {
    skillId: string;
    mastery: Mastery;
};

const selectClassName = `
  w-full

  [&_.ant-select-selector]:!bg-transparent
  [&_.ant-select-selector]:!border-[#5A5A5A]
  dark:[&_.ant-select-selector]:!bg-transparent
  dark:[&_.ant-select-selector]:!border-white/20

  [&_.ant-select-selection-item]:!text-[#2E2E2E]
  dark:[&_.ant-select-selection-item]:!text-white/90

  [&_.ant-select-selection-placeholder]:!text-[#767676]
  dark:[&_.ant-select-selection-placeholder]:!text-white/45

  [&_.ant-select-arrow]:!text-[#767676]
  dark:[&_.ant-select-arrow]:!text-white/60
`;

const selectPopupClassName = `
  bg-white
  dark:bg-[#303030]

  [&_.ant-select-item]:!text-[#2E2E2E]
  dark:[&_.ant-select-item]:!text-white/80

  [&_.ant-select-item-option-active]:!bg-black/5
  dark:[&_.ant-select-item-option-active]:!bg-white/10

  [&_.ant-select-item-option-selected]:!bg-black/10
  dark:[&_.ant-select-item-option-selected]:!bg-white/15
`;

export const CvSkillsSection = ({ cvId }: CvSkillsSectionProps) => {
    const { t } = useLocale();
    const [form] = Form.useForm<AddSkillFormValues>();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRemoveMode, setIsRemoveMode] = useState(false);
    const [selectedSkillNames, setSelectedSkillNames] = useState<string[]>([]);

    const {
        skills,
        categories,
        skillsCatalog,
        isLoading,
        error,
        isMutating,
        addSkill,
        deleteSkills,
    } = useCVSkills({ cvId });

    const groups = useMemo(
        () => groupCVSkillsByCategory(skills, categories),
        [skills, categories],
    );

    const skillOptions = useMemo(() => {
        const addedSkillNames = new Set(
            skills.map((skill) => skill.name.toLowerCase()),
        );

        return skillsCatalog
            .filter((skill) => !addedSkillNames.has(skill.name.toLowerCase()))
            .map((skill) => ({
                label: skill.name,
                value: skill.id,
            }));
    }, [skills, skillsCatalog]);

    const handleSelectSkill = (skillName: string) => {
        setSelectedSkillNames((prev) =>
            prev.includes(skillName)
                ? prev.filter((name) => name !== skillName)
                : [...prev, skillName],
        );
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        form.resetFields();
        setIsAddModalOpen(false);
    };

    const handleAddSkill = async () => {
        const values = await form.validateFields();

        const selectedSkill = skillsCatalog.find(
            (skill) => skill.id === values.skillId,
        );

        if (!selectedSkill) {
            return;
        }

        const isAlreadyAdded = skills.some(
            (skill) =>
                skill.name.trim().toLowerCase() ===
                selectedSkill.name.trim().toLowerCase(),
        );

        if (isAlreadyAdded) {
            form.resetFields();
            setIsAddModalOpen(false);
            return;
        }

        const newSkill: CVSkill = {
            name: selectedSkill.name,
            categoryId: selectedSkill.category?.id ?? null,
            mastery: values.mastery,
        };

        await addSkill(newSkill);

        form.resetFields();
        setIsAddModalOpen(false);
    };

    const handleRemoveButtonClick = async () => {
        if (!isRemoveMode) {
            setIsRemoveMode(true);
            return;
        }

        if (!selectedSkillNames.length) {
            setIsRemoveMode(false);
            return;
        }

        await deleteSkills(selectedSkillNames);

        setSelectedSkillNames([]);
        setIsRemoveMode(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Spin />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                type="error"
                message={t.cv.skills.errors.loadFailed}
                description={error.message}
                showIcon
            />
        );
    }

    return (
        <>
            <section className="relative mx-auto flex h-auto min-h-[624px] w-full max-w-[900px] flex-col px-4 pb-[96px] pt-8 sm:px-6 lg:h-[624px] lg:px-6 lg:pb-[88px]">
                {!skills.length ? (
                    <div className="flex flex-1 items-center justify-center">
                        <Empty
                            description={t.cv.skills.empty.none}
                            className="
                [&_.ant-empty-description]:!text-[#767676]
                dark:[&_.ant-empty-description]:!text-white/55
              "
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-[42px] overflow-y-auto pr-1 lg:max-h-[480px]">
                        {groups.map((group) => (
                            <section key={group.categoryId ?? group.categoryName}>
                                <h2 className="mb-[24px] font-roboto text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#2E2E2E] transition-colors dark:text-white/90">
                                    {translateCategoryName(t, group.categoryName)}
                                </h2>

                                <div className="grid grid-cols-1 gap-x-[25px] gap-y-[18px] sm:grid-cols-2 lg:grid-cols-3">
                                    {group.skills.map((skill, index) => (
                                        <CvSkillItem
                                            key={`${skill.categoryId}-${skill.name}-${skill.mastery}-${index}`}
                                            skill={skill}
                                            isRemoveMode={isRemoveMode}
                                            isSelected={selectedSkillNames.includes(skill.name)}
                                            onSelect={handleSelectSkill}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                <div className="absolute bottom-4 right-0 flex h-[64px] items-center pr-0">
                    <div className="flex items-center gap-[28px]">
                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            disabled={isMutating}
                            className="
                flex
                h-[48px]
                w-[220px]
                items-center
                justify-center
                gap-[20px]
                rounded-[40px]
                border-none
                bg-transparent
                font-roboto
                text-[14px]
                font-medium
                uppercase
                leading-[24.5px]
                tracking-[0.4px]
                text-[#767676]
                transition-colors

                hover:bg-black/5
                hover:text-[#2E2E2E]

                disabled:opacity-50

                dark:text-white/45
                dark:hover:bg-white/[0.08]
                dark:hover:text-white/70
              "
                        >
                            <Plus size={24} strokeWidth={2} />
                            {t.cv.skills.actions.add}
                        </button>

                        <button
                            type="button"
                            onClick={handleRemoveButtonClick}
                            disabled={isMutating}
                            className="
                flex
                h-[48px]
                w-[220px]
                items-center
                justify-center
                gap-[20px]
                rounded-[40px]
                border-none
                bg-transparent
                font-roboto
                text-[14px]
                font-medium
                uppercase
                leading-[24.5px]
                tracking-[0.4px]
                text-[#D9363E]
                transition-colors

                hover:bg-[#D9363E]/5
                hover:text-[#C63031]

                disabled:opacity-50

                dark:text-[#D9363E]
                dark:hover:bg-white/[0.08]
                dark:hover:text-[#ff5a5f]
              "
                        >
                            <Trash2 size={24} strokeWidth={2.4} />
                            {isRemoveMode
                                ? selectedSkillNames.length
                                    ? t.cv.skills.actions.deleteSelected
                                    : t.common.cancel
                                : t.cv.skills.actions.remove}
                        </button>
                    </div>
                </div>
            </section>

            <Modal
                title={t.cv.skills.modal.addTitle}
                open={isAddModalOpen}
                onCancel={handleCloseAddModal}
                footer={
                    <div className="mt-[24px] flex items-center justify-end gap-[16px]">
                        <button
                            type="button"
                            onClick={handleCloseAddModal}
                            disabled={isMutating}
                            className="
                h-[48px]
                w-[180px]
                rounded-[40px]
                border
                border-[#D9D9D9]
                bg-transparent
                font-roboto
                text-[14px]
                font-medium
                uppercase
                leading-[24.5px]
                tracking-[0.4px]
                text-[#767676]
                transition-colors

                hover:bg-black/5
                hover:text-[#2E2E2E]

                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:border-white/20
                dark:text-white/55
                dark:hover:border-white/25
                dark:hover:bg-white/[0.08]
                dark:hover:text-white/75
              "
                        >
                            {t.common.cancel}
                        </button>

                        <button
                            type="button"
                            onClick={handleAddSkill}
                            disabled={isMutating}
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
                transition-colors

                hover:bg-[#C63031]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
                        >
                            {isMutating ? t.common.loading : t.common.add}
                        </button>
                    </div>
                }
                closeIcon={
                    <X
                        size={24}
                        strokeWidth={1.8}
                        className="text-[#767676] transition-colors dark:text-white/75"
                    />
                }
                destroyOnHidden
                className="
          [&_.ant-modal-content]:!rounded-[4px]
          [&_.ant-modal-content]:!bg-white
          [&_.ant-modal-content]:!px-[32px]
          [&_.ant-modal-content]:!pb-[24px]
          [&_.ant-modal-content]:!pt-[24px]
          dark:[&_.ant-modal-content]:!bg-[#303030]

          [&_.ant-modal-header]:!bg-white
          dark:[&_.ant-modal-header]:!bg-[#303030]

          [&_.ant-modal-title]:!font-roboto
          [&_.ant-modal-title]:!text-[20px]
          [&_.ant-modal-title]:!font-medium
          [&_.ant-modal-title]:!leading-[28px]
          [&_.ant-modal-title]:!text-[#2E2E2E]
          dark:[&_.ant-modal-title]:!text-white/90

          [&_.ant-form-item-label_label]:!text-[#767676]
          dark:[&_.ant-form-item-label_label]:!text-white/60
        "
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="pt-4"
                    initialValues={{
                        mastery: "Novice",
                    }}
                >
                    <Form.Item
                        name="skillId"
                        label={t.cv.skills.form.skillLabel}
                        rules={[
                            {
                                required: true,
                                message: t.cv.skills.validation.selectSkill,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder={t.cv.skills.form.skillPlaceholder}
                            options={skillOptions}
                            optionFilterProp="label"
                            className={selectClassName}
                            popupClassName={selectPopupClassName}
                        />
                    </Form.Item>

                    <Form.Item
                        name="mastery"
                        label={t.cv.skills.form.masteryLabel}
                        rules={[
                            {
                                required: true,
                                message: t.cv.skills.validation.selectMastery,
                            },
                        ]}
                    >
                        <Select
                            options={getMasteryOptions(t)}
                            className={selectClassName}
                            popupClassName={selectPopupClassName}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};