"use client";

import { Button, Spin } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useLanguages } from "../hooks/useLanguages";
import { LanguageItems } from "./LanguageItems";
import { LanguageFormModal } from "./LanguageFormModal";
import { getUserId, useLocale } from "@/src/shared";

type LanguagesPageProps = {
    userId?: string;
};

export const LanguagesPage = ({ userId }: LanguagesPageProps) => {
    const { t } = useLocale();

    if (!userId) {
        userId = getUserId();
    }

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

    const selectedCount = selectedRemoveLanguages.length;

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
                    <div className="mt-20 flex w-full items-center justify-end gap-3 p-4 md:flex-row md:gap-6">
                        <Button
                            type="text"
                            icon={
                                <Plus
                                    size={16}
                                    className="
                    text-[#666666]
                    transition-colors
                    dark:text-white/45
                  "
                                />
                            }
                            onClick={() => setIsAddModalOpen(true)}
                            className="
                group!
                flex!
                items-center!
                rounded-4xl!
                px-6!
                py-4!
                text-[14px]!
                font-medium!
                uppercase!
                tracking-wide!
                text-[#888888]!
                transition-colors!

                hover:bg-gray-100!
                hover:text-[#2E2E2E]!

                dark:text-white/45!
                dark:hover:bg-white/8!
                dark:hover:text-white/70!

                dark:hover:[&_.lucide]:text-white/70!

                md:px-15!
                md:py-7!
                md:text-[16px]!
              "
                        >
                            {t.languages.actions.add}
                        </Button>

                        <Button
                            type="text"
                            icon={<Trash2 size={16} />}
                            disabled={userLanguages.length === 0}
                            onClick={() => setIsRemoveMode(true)}
                            className="
                flex!
                items-center!
                rounded-4xl!
                px-6!
                py-4!
                text-[14px]!
                font-medium!
                uppercase!
                tracking-wide!
                text-[#fd0004]!
                transition-colors!

                hover:bg-[#fa2c28]!
                hover:text-white!

                disabled:text-[#bdbdbd]!
                disabled:hover:bg-transparent!

                dark:text-[#fd0004]!
                dark:hover:bg-[#fa2c28]!
                dark:hover:text-white!
                dark:disabled:text-white/25!
                dark:disabled:hover:bg-transparent!

                md:px-15!
                md:py-7!
                md:text-[16px]!
              "
                        >
                            {t.languages.actions.remove}
                        </Button>
                    </div>
                )}

                {canEdit && isRemoveMode && (
                    <div className="mt-20 flex w-full items-center justify-end gap-3 p-4 md:flex-row md:gap-6">
                        <Button
                            type="text"
                            onClick={cancelRemoveMode}
                            className="
                flex!
                items-center!
                rounded-4xl!
                border!
                border-[#D9D9D9]!
                px-6!
                py-4!
                text-[14px]!
                font-medium!
                uppercase!
                tracking-wide!
                text-[#888888]!
                transition-colors!

                hover:border-[#BDBDBD]!
                hover:bg-gray-100!
                hover:text-[#2E2E2E]!

                dark:border-white/20!
                dark:text-white/55!

                dark:hover:border-white/25!
                dark:hover:bg-white/8!
                dark:hover:text-white/75!

                md:px-15!
                md:py-7!
                md:text-[16px]!
              "
                        >
                            {t.common.close}
                        </Button>

                        <Button
                            type="text"
                            icon={<Trash2 size={16} />}
                            loading={isRemoveLoading}
                            disabled={selectedCount === 0}
                            onClick={removeSelectedLanguages}
                            className={`
                flex!
                items-center!
                rounded-4xl!
                px-6!
                py-4!
                text-[14px]!
                font-medium!
                uppercase!
                tracking-wide!
                transition-colors!

                md:px-15!
                md:py-7!
                md:text-[16px]!

                ${
                                selectedCount >= 1
                                    ? `
                      bg-red-500!
                      text-white!

                      hover:bg-[#df0703]!
                      hover:text-white!

                      dark:bg-red-500!
                      dark:text-white!
                      dark:hover:bg-[#df0703]!
                      dark:hover:text-white!
                    `
                                    : `
                      bg-gray-200!
                      text-gray-600!

                      hover:bg-gray-300!
                      hover:text-gray-700!

                      dark:bg-white/14!
                      dark:text-white/45!
                      dark:hover:bg-white/18!
                      dark:hover:text-white/55!
                    `
                            }
              `}
                        >
                            {t.languages.actions.remove}

                            {selectedCount >= 1 && (
                                <span
                                    className="
                    flex
                    h-6
                    min-w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    px-2
                    text-[14px]
                    font-medium
                    text-black
                  "
                                >
                  {selectedCount}
                </span>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <LanguageFormModal
                title={t.languages.modal.addTitle}
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
                title={t.languages.modal.updateTitle}
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