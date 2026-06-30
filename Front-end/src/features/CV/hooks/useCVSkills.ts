"use client";

import { useMutation, useQuery } from "@apollo/client/react";

import {
    ADD_CV_SKILL,
    DELETE_CV_SKILL,
    GET_CV_SKILLS,
    GET_SKILL_CATEGORIES,
    GET_SKILLS,
    UPDATE_CV_SKILL,
} from "@/src/entities";

import type {
    AddCVSkillVariables,
    CVSkill,
    CVSkillsMutationResponse,
    CVSkillsResponse,
    CVSkillsVariables,
    DeleteCVSkillVariables,
    SkillCategoriesResponse,
    SkillsCatalogResponse,
    UpdateCVSkillVariables,
} from "../model/skills/types.skills";

type UseCVSkillsParams = {
    cvId: string;
};

export const useCVSkills = ({ cvId }: UseCVSkillsParams) => {
    const {
        data,
        loading: isLoading,
        error,
    } = useQuery<CVSkillsResponse, CVSkillsVariables>(GET_CV_SKILLS, {
        variables: {
            cvId,
        },
        skip: !cvId,
        fetchPolicy: "cache-and-network",
    });

    const { data: categoriesData, loading: isCategoriesLoading } =
        useQuery<SkillCategoriesResponse>(GET_SKILL_CATEGORIES);

    const [addSkillMutation, { loading: isAdding }] = useMutation<
        CVSkillsMutationResponse,
        AddCVSkillVariables
    >(ADD_CV_SKILL);

    const [updateSkillMutation, { loading: isUpdating }] = useMutation<
        CVSkillsMutationResponse,
        UpdateCVSkillVariables
    >(UPDATE_CV_SKILL);

    const [deleteSkillMutation, { loading: isDeleting }] = useMutation<
        CVSkillsMutationResponse,
        DeleteCVSkillVariables
    >(DELETE_CV_SKILL);

    const { data: skillsCatalogData, loading: isSkillsCatalogLoading } =
        useQuery<SkillsCatalogResponse>(GET_SKILLS);

    const addSkill = (skill: CVSkill) => {
        return addSkillMutation({
            variables: {
                skill: {
                    cvId,
                    name: skill.name,
                    categoryId: skill.categoryId,
                    mastery: skill.mastery,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_SKILLS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    const updateSkill = (skill: CVSkill) => {
        return updateSkillMutation({
            variables: {
                skill: {
                    cvId,
                    name: skill.name,
                    categoryId: skill.categoryId,
                    mastery: skill.mastery,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_SKILLS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    const deleteSkills = (names: string[]) => {
        return deleteSkillMutation({
            variables: {
                skill: {
                    cvId,
                    name: names,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_SKILLS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    const isMutating = isAdding || isUpdating || isDeleting;

    return {
        skills: data?.cv.skills ?? [],
        categories: categoriesData?.skillCategories ?? [],
        skillsCatalog: skillsCatalogData?.skills ?? [],
        isLoading,
        isCategoriesLoading,
        isSkillsCatalogLoading,
        isMutating,
        error,
        addSkill,
        updateSkill,
        deleteSkills,
    };
};