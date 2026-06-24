"use client";

import { Button, Spin } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useLanguages } from "../hooks/useLanguages";
import { LanguageItems } from "./LanguageItems";
import { LanguageFormModal } from "./LanguageFormModal";

type LanguagesPageProps = {
    userId: string;
};

export const LanguagesPage = ({ userId }: LanguagesPageProps) => {
    const {
        canEdit,

        userLanguages,
        languageOptions,
        updateLanguageOptions,

        isUserLanguagesLoading,
        isLanguagesLoading,
        isAddLoading,
        isUpdateLoading,
        isRemoveLoading,

        isAddModalOpen,
        isUpdateModalOpen,
        isRemoveMode,

        selectedLanguage,
        selectedProficiency,
        updatingLanguage,
        updatingProficiency,
        selectedRemoveLanguages,

        setIsAddModalOpen,
        setIsUpdateModalOpen,
        setIsRemoveMode,
        setSelectedLanguage,
        setSelectedProficiency,
        setUpdatingProficiency,

        openUpdateModal,
        toggleRemoveLanguage,
        addSelectedLanguage,
        updateSelectedLanguage,
        removeSelectedLanguages,
        cancelRemoveMode,
    } = useLanguages(userId);

    if (!userId) {
        return null;
    }

    if (isUserLanguagesLoading) {
        return (
            <div className="flex min-h-[320px] items-center justify-center">
                <Spin />
            </div>
        );
    }

    return (
        <section className="flex w-full flex-col">
            <div className="min-h-[220px] rounded-[2px] px-6 py-8 md:px-10">
                <LanguageItems
                    languages={userLanguages}
                    canEdit={canEdit}
                    isRemoveMode={isRemoveMode}
                    selectedRemoveLanguages={selectedRemoveLanguages}
                    onOpenUpdateModal={openUpdateModal}
                    onToggleRemoveLanguage={toggleRemoveLanguage}
                />

                {canEdit && !isRemoveMode && (
                    <div className="mt-20 flex flex-col items-start justify-end gap-5 md:flex-row md:items-center">
                        <Button
                            type="text"
                            icon={<Plus size={24} />}
                            onClick={() => setIsAddModalOpen(true)}
                            className="!flex !h-10 !items-center !gap-3 !border-0 !bg-transparent !px-0 !text-[14px] !font-semibold !uppercase !tracking-[0.3px] !text-[#7a7a7a] hover:!text-[#222222]"
                        >
                            Add language
                        </Button>

                        <Button
                            type="text"
                            icon={<Trash2 size={20} />}
                            disabled={userLanguages.length === 0}
                            onClick={() => setIsRemoveMode(true)}
                            className="!flex !h-10 !items-center !gap-3 !border-0 !bg-transparent !px-0 !text-[14px] !font-semibold !uppercase !tracking-[0.3px] !text-[#d32f2f] hover:!text-[#b71c1c] disabled:!text-[#bdbdbd]"
                        >
                            Remove languages
                        </Button>
                    </div>
                )}

                {canEdit && isRemoveMode && (
                    <div className="mt-20 flex flex-col items-start justify-end gap-5 md:flex-row md:items-center">
                        <Button
                            type="text"
                            onClick={cancelRemoveMode}
                            className="!h-11 !min-w-[220px] !rounded-[40px] !border !border-[#d1d5db] !bg-transparent !text-[14px] !font-semibold !uppercase !tracking-[0.3px] !text-[#7a7a7a] hover:!border-[#9ca3af] hover:!text-[#222222]"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="primary"
                            danger
                            loading={isRemoveLoading}
                            disabled={selectedRemoveLanguages.length === 0}
                            onClick={removeSelectedLanguages}
                            className="!h-11 !min-w-[220px] !rounded-[40px] !bg-[#d32f2f] !text-[14px] !font-semibold !uppercase !tracking-[0.3px] hover:!bg-[#b71c1c] disabled:!bg-[#d1d5db]"
                        >
              <span className="flex items-center justify-center gap-3">
                Delete
                  {selectedRemoveLanguages.length > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-bold text-[#d32f2f]">
                    {selectedRemoveLanguages.length}
                  </span>
                  )}
              </span>
                        </Button>
                    </div>
                )}
            </div>

            <LanguageFormModal
                title="Add language"
                open={isAddModalOpen}
                languageValue={selectedLanguage}
                languageOptions={languageOptions}
                proficiencyValue={selectedProficiency}
                languageLoading={isLanguagesLoading}
                confirmLoading={isAddLoading}
                confirmDisabled={!selectedLanguage}
                onCancel={() => setIsAddModalOpen(false)}
                onConfirm={addSelectedLanguage}
                onLanguageChange={setSelectedLanguage}
                onProficiencyChange={setSelectedProficiency}
            />

            <LanguageFormModal
                title="Update language"
                open={isUpdateModalOpen}
                languageDisabled
                languageValue={updatingLanguage?.name}
                languageOptions={updateLanguageOptions}
                proficiencyValue={updatingProficiency}
                confirmLoading={isUpdateLoading}
                confirmDisabled={
                    !updatingLanguage ||
                    updatingLanguage.proficiency === updatingProficiency
                }
                onCancel={() => setIsUpdateModalOpen(false)}
                onConfirm={updateSelectedLanguage}
                onProficiencyChange={setUpdatingProficiency}
            />
        </section>
    );
};