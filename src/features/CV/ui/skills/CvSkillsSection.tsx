"use client";

import { useMemo, useState } from "react";
import { Alert, Empty, Form, Modal, Select, Spin } from "antd";
import { Plus, Trash2 } from "lucide-react";

import { useCVSkills } from "../../hooks/useCVSkills";
import { groupCVSkillsByCategory } from "../../model/groupCVSkillsByCategory";
import type { CVSkill, Mastery } from "../../model/types.skills";

import { CvSkillItem } from "./CvSkillItem";

type CvSkillsSectionProps = {
    cvId: string;
};

type AddSkillFormValues = {
    skillId: string;
    mastery: Mastery;
};

const masteryOptions: Mastery[] = [
    "Novice",
    "Advanced",
    "Competent",
    "Proficient",
    "Expert",
];

export const CvSkillsSection = ({ cvId }: CvSkillsSectionProps) => {
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
                message="Failed to load CV skills"
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
                        <Empty description="No skills found" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-[42px] overflow-y-auto pr-1 lg:max-h-[480px]">
                        {groups.map((group) => (
                            <section key={group.categoryId ?? group.categoryName}>
                                <h2 className="mb-[24px] font-roboto text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#2E2E2E]">
                                    {group.categoryName}
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

                <div className="absolute bottom-4 right-0 flex h-[64px] items-center pr-0 backdrop-blur-[0.5px]">
                    <div className="flex items-center gap-[28px]">
                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            disabled={isMutating}
                            className="flex h-[48px] w-[220px] items-center justify-center gap-[20px] rounded-[40px] border-none bg-transparent font-roboto text-[14px] font-medium uppercase leading-[24.5px] tracking-[0.4px] text-[#767676] transition hover:bg-black/5 disabled:opacity-50"
                        >
                            <Plus size={24} strokeWidth={2} />
                            ADD SKILL
                        </button>

                        <button
                            type="button"
                            onClick={handleRemoveButtonClick}
                            disabled={isMutating}
                            className="flex h-[48px] w-[220px] items-center justify-center gap-[20px] rounded-[40px] border-none bg-transparent font-roboto text-[14px] font-medium uppercase leading-[24.5px] tracking-[0.4px] text-[#D9363E] transition hover:bg-[#D9363E]/5 disabled:opacity-50"
                        >
                            <Trash2 size={24} strokeWidth={2.4} />
                            {isRemoveMode
                                ? selectedSkillNames.length
                                    ? "DELETE SELECTED"
                                    : "CANCEL"
                                : "REMOVE SKILLS"}
                        </button>
                    </div>
                </div>
            </section>

            <Modal
                title="Add skill"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                onOk={handleAddSkill}
                okText="Add"
                confirmLoading={isMutating}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        mastery: "Novice",
                    }}
                >
                    <Form.Item
                        name="skillId"
                        label="Skill"
                        rules={[
                            {
                                required: true,
                                message: "Select skill",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select skill"
                            options={skillOptions}
                            optionFilterProp="label"
                        />
                    </Form.Item>

                    <Form.Item
                        name="mastery"
                        label="Mastery"
                        rules={[
                            {
                                required: true,
                                message: "Select mastery",
                            },
                        ]}
                    >
                        <Select
                            options={masteryOptions.map((mastery) => ({
                                label: mastery,
                                value: mastery,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};