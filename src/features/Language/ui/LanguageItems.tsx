import { Proficiency, type LanguageProficiency } from "@/src/shared";

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
    if (proficiency === Proficiency.Native) {
        return "text-[#d32f2f]";
    }

    if (
        proficiency === Proficiency.B2 ||
        proficiency === Proficiency.C1 ||
        proficiency === Proficiency.C2
    ) {
        return "text-[#3fa960]";
    }

    return "text-[#8a8a8a]";
};

export const LanguageItems = ({
                                  languages,
                                  canEdit,
                                  isRemoveMode,
                                  selectedRemoveLanguages,
                                  onOpenUpdateModal,
                                  onToggleRemoveLanguage,
                              }: LanguageItemsProps) => {
    if (languages.length === 0) {
        return (
            <div className="flex min-h-[120px] items-center justify-center text-[16px] text-[#8a8a8a]">
                No languages added yet
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
                        className={`grid min-h-10 grid-cols-[80px_1fr] items-center gap-6 rounded-md border border-transparent px-3 py-2 text-left transition ${
                            canEdit ? "cursor-pointer" : "cursor-default"
                        } ${
                            isRemoveMode && isSelectedForRemove
                                ? "border-red-200 bg-red-50"
                                : "bg-transparent"
                        } ${
                            isRemoveMode && !isSelectedForRemove ? "hover:bg-slate-50" : ""
                        } ${!isRemoveMode && canEdit ? "hover:bg-slate-50" : ""}`}
                    >
            <span
                className={`text-[18px] font-medium ${getProficiencyClassName(
                    language.proficiency,
                )}`}
            >
              {language.proficiency}
            </span>

                        <span
                            className={`text-[18px] font-medium ${
                                isRemoveMode && isSelectedForRemove
                                    ? "text-[#d32f2f]"
                                    : "text-[#6f6f6f]"
                            }`}
                        >
              {language.name}
            </span>
                    </button>
                );
            })}
        </div>
    );
};