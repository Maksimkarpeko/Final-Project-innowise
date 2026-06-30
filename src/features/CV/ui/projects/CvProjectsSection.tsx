"use client";

import { useMemo, useState } from "react";
import { Alert, Empty, Spin } from "antd";
import { Plus } from "lucide-react";
import { HeaderSearch, useLocale } from "@/src/shared";

import { useCVProjects } from "../../hooks/useCVProjects";
import type {
  CVProject,
  CVProjectFormValues,
} from "../../model/projects/types";

import { CvProjectModal } from "./CvProjectModal";
import { CvProjectRow } from "./CvProjectRow";
import { CvRemoveProjectModal } from "./CvRemoveProjectModal";

type CvProjectsSectionProps = {
  cvId: string;
};

export const CvProjectsSection = ({ cvId }: CvProjectsSectionProps) => {
  const { t } = useLocale();
  const [search, setSearch] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProject, setSelectedProject] = useState<CVProject | null>(
    null,
  );
  const [projectToRemove, setProjectToRemove] = useState<CVProject | null>(
    null,
  );

  const {
    cvProjects,
    projectsCatalog,
    isLoading,
    isProjectsCatalogLoading,
    isMutating,
    error,
    addProject,
    updateProject,
    removeProject,
  } = useCVProjects({ cvId });

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return cvProjects;
    }

    return cvProjects.filter((project) => {
      return [
        project.name,
        project.domain,
        project.description,
        ...project.environment,
        ...project.roles,
        ...project.responsibilities,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [cvProjects, search]);

  const existingProjectIds = useMemo(() => {
    return cvProjects.map((project) => project.project.id);
  }, [cvProjects]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  const handleOpenEditModal = (project: CVProject) => {
    setModalMode("edit");
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const handleSubmitProject = async (values: CVProjectFormValues) => {
    if (modalMode === "add") {
      const isDuplicate = cvProjects.some(
        (project) => project.project.id === values.projectId,
      );

      if (isDuplicate) {
        handleCloseProjectModal();
        return;
      }

      await addProject(values);
      handleCloseProjectModal();
      return;
    }

    await updateProject(values);
    handleCloseProjectModal();
  };

  const handleOpenRemoveModal = (project: CVProject) => {
    setProjectToRemove(project);
  };

  const handleConfirmRemove = async () => {
    if (!projectToRemove) {
      return;
    }

    await removeProject(projectToRemove.project.id);
    setProjectToRemove(null);
  };

  if (isLoading || isProjectsCatalogLoading) {
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
        message={t.cv.projects.errors.loadFailed}
        description={error.message}
        showIcon
      />
    );
  }

  return (
    <>
      <section className="mx-auto w-full max-w-[1180px] bg-white">
        <div className="mb-[32px] flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="w-full max-w-[360px] [&>div]:ml-0 [&>div>span]:hidden">
            <HeaderSearch searchValue={search} setSearchValue={setSearch} />
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="
                            mt-[12px]
                            flex
                            h-[40px]
                            w-fit
                            items-center
                            gap-3
                            rounded-[40px]
                            px-5
                            font-roboto
                            text-[14px]
                            font-medium
                            uppercase
                            leading-[24.5px]
                            tracking-[0.4px]
                            text-[#D9363E]
                            transition
                            hover:bg-[#D9363E]/5
                            md:mt-[12px]
                        "
          >
            <Plus size={22} />
            {t.cv.projects.actions.add}
          </button>
        </div>

        <div className="grid grid-cols-[1.1fr_1.1fr_0.7fr_0.7fr_32px] gap-6 border-b border-[#E0E0E0] pb-[16px] font-roboto text-[14px] font-medium leading-[24px] text-[#2E2E2E]">
          <span>{t.cv.projects.table.name}</span>
          <span>{t.cv.projects.table.domain}</span>
          <span>{t.cv.projects.table.startDate}</span>
          <span>{t.cv.projects.table.endDate}</span>
          <span />
        </div>

        {!filteredProjects.length ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <Empty description={t.cv.projects.empty.none} />
          </div>
        ) : (
          <div>
            {filteredProjects.map((project) => (
              <CvProjectRow
                key={project.project.id}
                project={project}
                onEdit={handleOpenEditModal}
                onRemove={handleOpenRemoveModal}
              />
            ))}
          </div>
        )}
      </section>

      <CvProjectModal
        open={isProjectModalOpen}
        mode={modalMode}
        project={selectedProject}
        projectsCatalog={projectsCatalog}
        existingProjectIds={existingProjectIds}
        isLoading={isMutating}
        onCancel={handleCloseProjectModal}
        onSubmit={handleSubmitProject}
      />

      <CvRemoveProjectModal
        open={Boolean(projectToRemove)}
        project={projectToRemove}
        isLoading={isMutating}
        onCancel={() => setProjectToRemove(null)}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
};
