"use client";

import {
    type LanguageProficiency,
    getProficiencyLabel,
    useLocale,
} from "@/src/shared";

type LanguageItemsProps = {
    languages: LanguageProficiency[];
    canEdit: boolean;
    isRemoveMode: boolean;
    selectedRemoveLanguages: string[];
    onOpenUpdateModal: (language: LanguageProficiency) => void;
    onToggleRemoveLanguage: (name: string) => void;
};

const getProficiencyClassName = (
    proficiency: LanguageProficiency["proficiency"],
) => {
    if (proficiency === "Native") {
        return "text-[#d32f2f]";
    }

    if (proficiency === "B2" || proficiency === "C1" || proficiency === "C2") {
        return "text-[#3fa960]";
    }

    return "text-[#8a8a8a] dark:text-white/55";
};

export const LanguageItems = ({
                                  languages,
                                  canEdit,
                                  isRemoveMode,
                                  selectedRemoveLanguages,
                                  onOpenUpdateModal,
                                  onToggleRemoveLanguage,
                              }: LanguageItemsProps) => {
    const { t } = useLocale();

    if (languages.length === 0) {
        return (
            <div className="flex min-h-[120px] items-center justify-center text-[16px] text-[#8a8a8a] transition-colors dark:text-white/55">
                {t.languages.empty.none}
            </div>
        );
    }

    return (
        <div
            className="
        flex
        w-full
        flex-col
        items-start
        gap-3

        sm:flex-row
        sm:flex-wrap
        sm:gap-4

        lg:grid
        lg:grid-cols-3
        lg:gap-x-16
        lg:gap-y-8
      "
        >
            {languages.map((language) => {
                const isSelectedForRemove = selectedRemoveLanguages.includes(
                    language.name,
                );

                return (
                    <button
                        key={language.name}
                        type="button"
                        onClick={() =>
                            isRemoveMode
                                ? onToggleRemoveLanguage(language.name)
                                : onOpenUpdateModal(language)
                        }
                        className={`
              grid
              min-h-10
              max-w-full
              grid-cols-[80px_1fr]
              items-center
              gap-4
              rounded-md
              border
              px-3
              py-2
              text-left
              transition-colors

              sm:gap-6

              ${canEdit ? "cursor-pointer" : "cursor-default"}

              ${
                            isSelectedForRemove
                                ? `
                    border-[#E0E0E0]
                    bg-gray-100
                    dark:border-white/10
                    dark:bg-white/10
                  `
                                : `
                    border-transparent
                    bg-transparent
                  `
                        }

              ${
                            canEdit
                                ? `
                    hover:bg-gray-100
                    dark:hover:bg-white/8
                  `
                                : ""
                        }
            `}
                    >
            <span
                className={`text-[18px] font-medium ${getProficiencyClassName(
                    language.proficiency,
                )}`}
            >
              {getProficiencyLabel(t, language.proficiency)}
            </span>

                        <span
                            className={`
                truncate
                text-[18px]
                font-medium
                transition-colors

                ${
                                isSelectedForRemove
                                    ? "text-[#6f6f6f] dark:text-white/90"
                                    : "text-[#6f6f6f] dark:text-white/75"
                            }
              `}
                        >
              {language.name}
            </span>
                    </button>
                );
            })}
        </div>
    );
};