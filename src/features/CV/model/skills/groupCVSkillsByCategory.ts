import type { CVSkill, SkillCategory } from "./types.skills";

export type CVSkillsGroup = {
    categoryId: string | null;
    categoryName: string;
    order: number;
    skills: CVSkill[];
};

const DEFAULT_CATEGORY_NAME = "Other";

const CATEGORY_ORDER: Record<string, number> = {
    "Programming languages": 1,
    Frontend: 2,
    Backend: 3,
    "Testing frameworks and tools": 4,
    DevOps: 5,
    "Source control systems": 6,
    Documentation: 7,
    "Graphic editors": 8,
    Other: 999,
};

const MASTERY_ORDER: Record<string, number> = {
    Expert: 1,
    Proficient: 2,
    Competent: 3,
    Advanced: 4,
    Novice: 5,
};

const getCategoryOrder = (categoryName: string) => {
    return CATEGORY_ORDER[categoryName] ?? CATEGORY_ORDER.Other;
};

export const groupCVSkillsByCategory = (
    skills: CVSkill[],
    categories: SkillCategory[],
): CVSkillsGroup[] => {
    const categoryMap = new Map<string, SkillCategory>();

    categories.forEach((category) => {
        categoryMap.set(category.id, category);

        category.children?.forEach((child) => {
            categoryMap.set(child.id, {
                ...child,
                parent: {
                    id: category.id,
                    name: category.name,
                },
                children: [],
            });
        });
    });

    const groups = new Map<string, CVSkillsGroup>();

    skills.forEach((skill) => {
        const category = skill.categoryId
            ? categoryMap.get(String(skill.categoryId))
            : undefined;

        const parentCategory = category?.parent ?? null;

        const groupId = parentCategory?.id ?? category?.id ?? "other";
        const groupName =
            parentCategory?.name ?? category?.name ?? DEFAULT_CATEGORY_NAME;

        const existingGroup = groups.get(groupId);

        if (existingGroup) {
            existingGroup.skills.push(skill);
            return;
        }

        groups.set(groupId, {
            categoryId: groupId === "other" ? null : groupId,
            categoryName: groupName,
            order: getCategoryOrder(groupName),
            skills: [skill],
        });
    });

    return Array.from(groups.values())
        .map((group) => ({
            ...group,
            skills: [...group.skills].sort((a, b) => {
                const masteryA = MASTERY_ORDER[a.mastery] ?? 999;
                const masteryB = MASTERY_ORDER[b.mastery] ?? 999;

                if (masteryA !== masteryB) {
                    return masteryA - masteryB;
                }

                return a.name.localeCompare(b.name);
            }),
        }))
        .sort((a, b) => {
            if (a.order !== b.order) {
                return a.order - b.order;
            }

            return a.categoryName.localeCompare(b.categoryName);
        });
};