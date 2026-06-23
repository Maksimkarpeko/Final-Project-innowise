"use client";

import { useEffect, useMemo } from "react";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import type {
    CVProject,
    CVProjectFormValues,
    ProjectCatalogItem,
} from "../../model/projects/types";

type CvProjectModalProps = {
    open: boolean;
    mode: "add" | "edit";
    project: CVProject | null;
    projectsCatalog: ProjectCatalogItem[];
    existingProjectIds: string[];
    isLoading: boolean;
    onCancel: () => void;
    onSubmit: (values: CVProjectFormValues) => Promise<void>;
};

type FormValues = {
    projectId: string;
    start_date: Dayjs | null;
    end_date: Dayjs | null;
    responsibilities: string;
};

const DATE_FORMAT = "YYYY-MM-DD";

const parseTextAreaToList = (value: string) => {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
};

const listToTextArea = (value: string[]) => {
    return value.join("\n");
};

const toDayjs = (date: string | null | undefined) => {
    if (!date) {
        return null;
    }

    const parsedDate = dayjs(date);

    return parsedDate.isValid() ? parsedDate : null;
};

const isBeforeDay = (date: Dayjs, compareDate: Dayjs) => {
    return date.startOf("day").isBefore(compareDate.startOf("day"));
};

const isAfterDay = (date: Dayjs, compareDate: Dayjs) => {
    return date.startOf("day").isAfter(compareDate.startOf("day"));
};

const textareaClass =
    "!resize-none resize-none [&::-webkit-resizer]:hidden";

export const CvProjectModal = ({
                                   open,
                                   mode,
                                   project,
                                   projectsCatalog,
                                   existingProjectIds,
                                   isLoading,
                                   onCancel,
                                   onSubmit,
                               }: CvProjectModalProps) => {
    const [form] = Form.useForm<FormValues>();

    const isEdit = mode === "edit";
    const selectedProjectId = Form.useWatch("projectId", form);

    const startDate = Form.useWatch("start_date", form);
    const endDate = Form.useWatch("end_date", form);

    const selectedCatalogProject = useMemo(() => {
        if (!selectedProjectId) {
            return null;
        }

        return (
            projectsCatalog.find(
                (catalogProject) => catalogProject.id === selectedProjectId,
            ) ?? null
        );
    }, [projectsCatalog, selectedProjectId]);

    const projectOptions = useMemo(() => {
        return projectsCatalog
            .filter((catalogProject) => {
                if (isEdit && project?.project.id === catalogProject.id) {
                    return true;
                }

                return !existingProjectIds.includes(catalogProject.id);
            })
            .map((catalogProject) => ({
                label: catalogProject.name,
                value: catalogProject.id,
            }));
    }, [existingProjectIds, isEdit, project, projectsCatalog]);

    useEffect(() => {
        if (!open) {
            return;
        }

        if (isEdit && project) {
            form.setFieldsValue({
                projectId: project.project.id,
                start_date: toDayjs(project.start_date),
                end_date: toDayjs(project.end_date),
                responsibilities: listToTextArea(project.responsibilities),
            });

            return;
        }

        form.setFieldsValue({
            projectId: undefined,
            start_date: null,
            end_date: null,
            responsibilities: "",
        });
    }, [form, isEdit, open, project]);

    useEffect(() => {
        if (!open || isEdit || !selectedCatalogProject) {
            return;
        }

        form.setFieldsValue({
            start_date: toDayjs(selectedCatalogProject.start_date),
            end_date: toDayjs(selectedCatalogProject.end_date),
        });
    }, [form, isEdit, open, selectedCatalogProject]);

    const handleSubmit = async () => {
        const values = await form.validateFields();

        await onSubmit({
            projectId: values.projectId,
            start_date: values.start_date?.format(DATE_FORMAT) ?? "",
            end_date: values.end_date?.format(DATE_FORMAT) ?? null,

            roles: [],

            responsibilities: parseTextAreaToList(values.responsibilities),
        });

        form.resetFields();
    };

    const domain = selectedCatalogProject?.domain ?? project?.domain ?? "";
    const description =
        selectedCatalogProject?.description ?? project?.description ?? "";
    const environment =
        selectedCatalogProject?.environment ?? project?.environment ?? [];

    const projectStartDate = toDayjs(
        selectedCatalogProject?.start_date ?? project?.project.start_date,
    );

    const projectEndDate = toDayjs(
        selectedCatalogProject?.end_date ?? project?.project.end_date,
    );

    const today = dayjs();

    return (
        <Modal
            title={isEdit ? "Update project" : "Add project"}
            open={open}
            onCancel={onCancel}
            confirmLoading={isLoading}
            destroyOnHidden
            width={900}
            style={{
                top: 56,
            }}
            footer={
                <div className="mt-[24px] flex items-center justify-end gap-[16px]">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="
                    h-[48px]
                    w-[300px]
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
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="
                    h-[48px]
                    w-[300px]
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
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
                    >
                        {isLoading ? "Loading..." : isEdit ? "Update" : "Add"}
                    </button>
                </div>
            }
            className="
                [&_.ant-modal-content]:rounded-[4px]
                [&_.ant-modal-content]:bg-white
                [&_.ant-modal-content]:px-[32px]
                [&_.ant-modal-content]:pb-[24px]
                [&_.ant-modal-content]:pt-[24px]
                [&_.ant-modal-header]:bg-white
                [&_.ant-modal-title]:font-roboto
                [&_.ant-modal-title]:text-[24px]
                [&_.ant-modal-title]:font-medium
                [&_.ant-modal-title]:leading-[32px]
                [&_.ant-modal-title]:text-[#2E2E2E]
            "
        >
            <Form form={form} layout="vertical" className="pt-4">
                <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                    <Form.Item
                        name="projectId"
                        label="Project"
                        rules={[
                            {
                                required: true,
                                message: "Select project",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            disabled={isEdit}
                            placeholder="Select project"
                            options={projectOptions}
                            optionFilterProp="label"
                        />
                    </Form.Item>

                    <Form.Item label="Domain">
                        <Input
                            readOnly
                            value={domain}
                            placeholder="Domain"
                            className="!bg-white !text-[#767676]"
                        />
                    </Form.Item>

                    <Form.Item
                        name="start_date"
                        label="Start Date"
                        dependencies={["end_date"]}
                        rules={[
                            {
                                required: true,
                                message: "Select start date",
                            },
                            {
                                validator: (_, value: Dayjs | null) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }

                                    if (projectStartDate && isBeforeDay(value, projectStartDate)) {
                                        return Promise.reject(
                                            new Error(
                                                `Start date cannot be earlier than project start date ${projectStartDate.format(DATE_FORMAT)}`,
                                            ),
                                        );
                                    }

                                    if (endDate && isAfterDay(value, endDate)) {
                                        return Promise.reject(
                                            new Error("Start date cannot be later than end date"),
                                        );
                                    }

                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker
                            className="w-full"
                            format={DATE_FORMAT}
                            placeholder="Select start date"
                            onChange={() => {
                                form.validateFields(["end_date"]);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="end_date"
                        label="End Date"
                        dependencies={["start_date"]}
                        rules={[
                            {
                                validator: (_, value: Dayjs | null) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }

                                    if (isAfterDay(value, today)) {
                                        return Promise.reject(
                                            new Error("End date cannot be later than today"),
                                        );
                                    }

                                    if (projectEndDate && isAfterDay(value, projectEndDate)) {
                                        return Promise.reject(
                                            new Error(
                                                `End date cannot be later than project end date ${projectEndDate.format(DATE_FORMAT)}`,
                                            ),
                                        );
                                    }

                                    if (startDate && isBeforeDay(value, startDate)) {
                                        return Promise.reject(
                                            new Error("End date cannot be earlier than start date"),
                                        );
                                    }

                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker
                            className="w-full"
                            format={DATE_FORMAT}
                            placeholder="Select end date"
                            onChange={() => {
                                form.validateFields(["start_date"]);
                            }}
                        />
                    </Form.Item>
                </div>

                <Form.Item label="Description">
                    <Input.TextArea
                        readOnly
                        rows={5}
                        value={description}
                        className={`${textareaClass} !bg-white !text-[#767676]`}
                        style={{
                            resize: "none",
                            cursor: "text",
                        }}
                    />
                </Form.Item>

                <Form.Item label="Environment">
                    <Select
                        open={false}
                        mode="multiple"
                        value={environment}
                        options={environment.map((item) => ({
                            label: item,
                            value: item,
                        }))}
                        className="
                            [&_.ant-select-selector]:!cursor-default
                            [&_.ant-select-selector]:!bg-white
                            [&_.ant-select-selection-item]:!bg-[#F0F0F0]
                            [&_.ant-select-selection-item]:!text-[#767676]
                            [&_.ant-select-arrow]:!text-[#767676]
                        "
                    />
                </Form.Item>

                <Form.Item
                    name="responsibilities"
                    label="Responsibilities"
                    rules={[
                        {
                            required: true,
                            message: "Enter responsibilities",
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={5}
                        placeholder={
                            "Developed UI components\nIntegrated API\nOptimized performance"
                        }
                        className={textareaClass}
                        style={{
                            resize: "none",
                            cursor: "text",
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};