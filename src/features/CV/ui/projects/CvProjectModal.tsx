"use client";

import { useEffect, useMemo } from "react";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { X } from "lucide-react";

import type {
    CVProject,
    CVProjectFormValues,
    ProjectCatalogItem,
} from "../../model/projects/types";
import { useLocale } from "@/src/shared";

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

const formItemClassName = `
  mb-[20px]!

  [&_.ant-form-item-label]:!pb-0
  [&_.ant-form-item-label_label]:!h-auto
  [&_.ant-form-item-label_label]:!bg-white
  [&_.ant-form-item-label_label]:!px-1
  [&_.ant-form-item-label_label]:!font-roboto
  [&_.ant-form-item-label_label]:!text-[12px]
  [&_.ant-form-item-label_label]:!font-normal
  [&_.ant-form-item-label_label]:!leading-[20px]
  [&_.ant-form-item-label_label]:!tracking-[0.15px]
  [&_.ant-form-item-label_label]:!text-[#767676]

  dark:[&_.ant-form-item-label_label]:!bg-[#303030]
  dark:[&_.ant-form-item-label_label]:!text-white/45

  [&_.ant-form-item-explain-error]:!text-[#D9363E]
`;

const controlBaseClassName = `
  h-[48px]!
  w-full!
  rounded-none!
  border-[#5A5A5A]!
  bg-transparent!
  font-roboto!
  text-[16px]!
  font-normal!
  leading-[24px]!
  tracking-[0.15px]!
  text-[#2E2E2E]!
  shadow-none!
  outline-none!
  transition-colors!

  hover:border-[#767676]!
  focus:border-[#D9363E]!

  placeholder:!text-[#767676]

  dark:border-white/20!
  dark:bg-transparent!
  dark:text-white/90!

  dark:hover:border-white/30!
  dark:focus:border-[#D9363E]!
  dark:placeholder:!text-white/45!
`;

const inputClassName = `
  ${controlBaseClassName}
  px-3!
`;

const readonlyInputClassName = `
  ${controlBaseClassName}
  px-3!
  cursor-default!
  text-[#767676]!

  dark:text-white/45!
`;

const textareaClassName = `
  w-full!
  resize-none!
  rounded-none!
  border-[#5A5A5A]!
  bg-transparent!
  px-3!
  py-3!
  font-roboto!
  text-[16px]!
  font-normal!
  leading-[24px]!
  tracking-[0.15px]!
  text-[#2E2E2E]!
  shadow-none!
  outline-none!
  transition-colors!

  hover:border-[#767676]!
  focus:border-[#D9363E]!

  placeholder:!text-[#767676]

  dark:border-white/20!
  dark:bg-transparent!
  dark:text-white/90!

  dark:hover:border-white/30!
  dark:focus:border-[#D9363E]!
  dark:placeholder:!text-white/45!

  [&::-webkit-resizer]:hidden
`;

const readonlyTextareaClassName = `
  ${textareaClassName}
  cursor-default!
  text-[#767676]!

  dark:text-white/45!
`;

const selectClassName = `
  h-[48px]!
  w-full!

  [&_.ant-select-selector]:!h-[48px]
  [&_.ant-select-selector]:!rounded-none
  [&_.ant-select-selector]:!border-[#5A5A5A]
  [&_.ant-select-selector]:!bg-transparent
  [&_.ant-select-selector]:!px-3
  [&_.ant-select-selector]:!shadow-none

  dark:[&_.ant-select-selector]:!border-white/20
  dark:[&_.ant-select-selector]:!bg-transparent

  [&_.ant-select-selection-item]:!font-roboto
  [&_.ant-select-selection-item]:!text-[16px]
  [&_.ant-select-selection-item]:!font-normal
  [&_.ant-select-selection-item]:!leading-[24px]
  [&_.ant-select-selection-item]:!tracking-[0.15px]
  [&_.ant-select-selection-item]:!text-[#2E2E2E]

  dark:[&_.ant-select-selection-item]:!text-white/90

  [&_.ant-select-selection-placeholder]:!text-[#767676]
  dark:[&_.ant-select-selection-placeholder]:!text-white/45

  [&_.ant-select-arrow]:!text-[#767676]
  dark:[&_.ant-select-arrow]:!text-white/60

  [&.ant-select-disabled_.ant-select-selector]:!bg-transparent
  [&.ant-select-disabled_.ant-select-selection-item]:!text-[#767676]
  dark:[&.ant-select-disabled_.ant-select-selector]:!bg-transparent
  dark:[&.ant-select-disabled_.ant-select-selection-item]:!text-white/45
`;

const environmentSelectClassName = `
  min-h-[48px]!
  w-full!

  [&_.ant-select-selector]:!min-h-[48px]
  [&_.ant-select-selector]:!rounded-none
  [&_.ant-select-selector]:!border-[#5A5A5A]
  [&_.ant-select-selector]:!bg-transparent
  [&_.ant-select-selector]:!px-3
  [&_.ant-select-selector]:!py-[6px]
  [&_.ant-select-selector]:!shadow-none
  [&_.ant-select-selector]:!cursor-default

  dark:[&_.ant-select-selector]:!border-white/20
  dark:[&_.ant-select-selector]:!bg-transparent

  [&_.ant-select-selection-item]:!rounded-[12px]
  [&_.ant-select-selection-item]:!border-none
  [&_.ant-select-selection-item]:!bg-[#F0F0F0]
  [&_.ant-select-selection-item]:!px-2
  [&_.ant-select-selection-item]:!font-roboto
  [&_.ant-select-selection-item]:!text-[13px]
  [&_.ant-select-selection-item]:!text-[#767676]

  dark:[&_.ant-select-selection-item]:!bg-white/10
  dark:[&_.ant-select-selection-item]:!text-white/45

  [&_.ant-select-selection-item-remove]:!text-[#767676]
  dark:[&_.ant-select-selection-item-remove]:!text-white/35

  [&_.ant-select-arrow]:!text-[#767676]
  dark:[&_.ant-select-arrow]:!text-white/45
`;

const datePickerClassName = `
  ${controlBaseClassName}
  px-3!

  [&_.ant-picker-input>input]:!font-roboto
  [&_.ant-picker-input>input]:!text-[16px]
  [&_.ant-picker-input>input]:!font-normal
  [&_.ant-picker-input>input]:!leading-[24px]
  [&_.ant-picker-input>input]:!tracking-[0.15px]
  [&_.ant-picker-input>input]:!text-[#2E2E2E]

  dark:[&_.ant-picker-input>input]:!text-white/90

  [&_.ant-picker-input>input::placeholder]:!text-[#767676]
  dark:[&_.ant-picker-input>input::placeholder]:!text-white/45

  [&_.ant-picker-suffix]:!text-[#767676]
  dark:[&_.ant-picker-suffix]:!text-white/90
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
    const { t } = useLocale();
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
            title={isEdit ? t.cv.projects.modal.updateTitle : t.cv.projects.modal.addTitle}
            open={open}
            onCancel={onCancel}
            confirmLoading={isLoading}
            destroyOnHidden
            width={900}
            style={{
                top: 56,
            }}
            closeIcon={
                <X
                    size={28}
                    strokeWidth={1.8}
                    className="text-[#767676] transition-colors dark:text-white/90"
                />
            }
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
              bg-transparent
              font-roboto
              text-[14px]
              font-medium
              uppercase
              leading-[24.5px]
              tracking-[0.4px]
              text-[#767676]
              transition-colors

              hover:border-[#BDBDBD]
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
              transition-colors

              hover:bg-[#C63031]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
                    >
                        {isLoading ? t.common.loading : isEdit ? t.common.update : t.common.add}
                    </button>
                </div>
            }
            className="
        [&_.ant-modal-content]:!rounded-[4px]
        [&_.ant-modal-content]:!bg-white
        [&_.ant-modal-content]:!px-[32px]
        [&_.ant-modal-content]:!pb-[24px]
        [&_.ant-modal-content]:!pt-[24px]
        [&_.ant-modal-content]:!shadow-[0_12px_40px_rgba(0,0,0,0.18)]

        dark:[&_.ant-modal-content]:!bg-[#303030]
        dark:[&_.ant-modal-content]:!shadow-[0_12px_40px_rgba(0,0,0,0.45)]

        [&_.ant-modal-header]:!bg-white
        dark:[&_.ant-modal-header]:!bg-[#303030]

        [&_.ant-modal-title]:!font-roboto
        [&_.ant-modal-title]:!text-[24px]
        [&_.ant-modal-title]:!font-medium
        [&_.ant-modal-title]:!leading-[32px]
        [&_.ant-modal-title]:!text-[#2E2E2E]
        dark:[&_.ant-modal-title]:!text-white/90

        [&_.ant-modal-close]:!text-[#767676]
        [&_.ant-modal-close]:!transition-colors
        [&_.ant-modal-close:hover]:!bg-transparent
        [&_.ant-modal-close:hover]:!text-[#2E2E2E]

        dark:[&_.ant-modal-close]:!text-white/75
        dark:[&_.ant-modal-close:hover]:!bg-transparent
        dark:[&_.ant-modal-close:hover]:!text-white

        [&_.ant-form-item-required]:before:!hidden
      "
        >
            <Form form={form} layout="vertical" className="pt-4">
                <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                    <Form.Item
                        name="projectId"
                        label={t.cv.projects.form.projectLabel}
                        className={formItemClassName}
                        rules={[
                            {
                                required: true,
                                message: t.cv.projects.validation.selectProject,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            disabled={isEdit}
                            placeholder={t.cv.projects.form.projectPlaceholder}
                            options={projectOptions}
                            optionFilterProp="label"
                            className={selectClassName}
                            popupClassName={selectPopupClassName}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t.cv.projects.form.domainLabel}
                        className={formItemClassName}
                    >
                        <Input
                            readOnly
                            value={domain}
                            placeholder={t.cv.projects.form.domainLabel}
                            className={readonlyInputClassName}
                        />
                    </Form.Item>

                    <Form.Item
                        name="start_date"
                        label={t.cv.projects.form.startDate}
                        className={formItemClassName}
                        dependencies={["end_date"]}
                        rules={[
                            {
                                required: true,
                                message: t.cv.projects.validation.selectStartDate,
                            },
                            {
                                validator: (_, value: Dayjs | null) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }

                                    if (projectStartDate && isBeforeDay(value, projectStartDate)) {
                                        return Promise.reject(
                                            new Error(
                                                `${t.cv.projects.validation.startBeforeProjectStart} ${projectStartDate.format(DATE_FORMAT)}`,
                                            ),
                                        );
                                    }

                                    if (endDate && isAfterDay(value, endDate)) {
                                        return Promise.reject(
                                            new Error(t.cv.projects.validation.startAfterEnd),
                                        );
                                    }

                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker
                            className={datePickerClassName}
                            format={DATE_FORMAT}
                            placeholder={t.cv.projects.form.startDatePlaceholder}
                            onChange={() => {
                                form.validateFields(["end_date"]);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="end_date"
                        label={t.cv.projects.form.endDate}
                        className={formItemClassName}
                        dependencies={["start_date"]}
                        rules={[
                            {
                                validator: (_, value: Dayjs | null) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }

                                    if (isAfterDay(value, today)) {
                                        return Promise.reject(
                                            new Error(t.cv.projects.validation.endAfterToday),
                                        );
                                    }

                                    if (projectEndDate && isAfterDay(value, projectEndDate)) {
                                        return Promise.reject(
                                            new Error(
                                                `${t.cv.projects.validation.endAfterProjectEnd} ${projectEndDate.format(DATE_FORMAT)}`,
                                            ),
                                        );
                                    }

                                    if (startDate && isBeforeDay(value, startDate)) {
                                        return Promise.reject(
                                            new Error(t.cv.projects.validation.endBeforeStart),
                                        );
                                    }

                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <DatePicker
                            className={datePickerClassName}
                            format={DATE_FORMAT}
                            placeholder={t.cv.projects.form.endDatePlaceholder}
                            onChange={() => {
                                form.validateFields(["start_date"]);
                            }}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label={t.cv.projects.form.descriptionLabel}
                    className={formItemClassName}
                >
                    <Input.TextArea
                        readOnly
                        rows={5}
                        value={description}
                        className={readonlyTextareaClassName}
                        style={{
                            resize: "none",
                            cursor: "text",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label={t.cv.projects.form.environmentLabel}
                    className={formItemClassName}
                >
                    <Select
                        open={false}
                        mode="multiple"
                        value={environment}
                        options={environment.map((item) => ({
                            label: item,
                            value: item,
                        }))}
                        className={environmentSelectClassName}
                    />
                </Form.Item>

                <Form.Item
                    name="responsibilities"
                    label={t.cv.projects.form.responsibilitiesLabel}
                    className={formItemClassName}
                    rules={[
                        {
                            required: true,
                            message: t.cv.projects.validation.enterResponsibilities,
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={5}
                        placeholder={t.cv.projects.form.responsibilitiesPlaceholder}
                        className={textareaClassName}
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