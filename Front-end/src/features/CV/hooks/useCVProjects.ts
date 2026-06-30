"use client";

import { useMutation, useQuery } from "@apollo/client/react";

import {
    ADD_CV_PROJECT,
    GET_CV_PROJECTS,
    GET_PROJECTS,
    REMOVE_CV_PROJECT,
    UPDATE_CV_PROJECT,
} from "@/src/entities";

import type {
    AddCVProjectVariables,
    CVProjectFormValues,
    CVProjectsMutationResponse,
    GetCVProjectsResponse,
    GetCVProjectsVariables,
    GetProjectsResponse,
    RemoveCVProjectVariables,
    UpdateCVProjectVariables,
} from "../model/projects/types";

type UseCVProjectsParams = {
    cvId: string;
};

export const useCVProjects = ({ cvId }: UseCVProjectsParams) => {
    const {
        data,
        loading: isLoading,
        error,
    } = useQuery<GetCVProjectsResponse, GetCVProjectsVariables>(
        GET_CV_PROJECTS,
        {
            variables: {
                cvId,
            },
            skip: !cvId,
            fetchPolicy: "cache-and-network",
        },
    );

    const { data: projectsCatalogData, loading: isProjectsCatalogLoading } =
        useQuery<GetProjectsResponse>(GET_PROJECTS, {
            fetchPolicy: "cache-and-network",
        });

    const [addProjectMutation, { loading: isAdding }] = useMutation<
        CVProjectsMutationResponse,
        AddCVProjectVariables
    >(ADD_CV_PROJECT);

    const [updateProjectMutation, { loading: isUpdating }] = useMutation<
        CVProjectsMutationResponse,
        UpdateCVProjectVariables
    >(UPDATE_CV_PROJECT);

    const [removeProjectMutation, { loading: isRemoving }] = useMutation<
        CVProjectsMutationResponse,
        RemoveCVProjectVariables
    >(REMOVE_CV_PROJECT);

    const addProject = (values: CVProjectFormValues) => {
        return addProjectMutation({
            variables: {
                project: {
                    cvId,
                    projectId: values.projectId,
                    start_date: values.start_date,
                    end_date: values.end_date || null,
                    roles: values.roles,
                    responsibilities: values.responsibilities,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_PROJECTS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    const updateProject = (values: CVProjectFormValues) => {
        return updateProjectMutation({
            variables: {
                project: {
                    cvId,
                    projectId: values.projectId,
                    start_date: values.start_date,
                    end_date: values.end_date || null,
                    roles: values.roles,
                    responsibilities: values.responsibilities,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_PROJECTS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    const removeProject = (projectId: string) => {
        return removeProjectMutation({
            variables: {
                project: {
                    cvId,
                    projectId,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_PROJECTS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    return {
        cvProjects: data?.cv.projects ?? [],
        projectsCatalog: projectsCatalogData?.projects ?? [],
        isLoading,
        isProjectsCatalogLoading,
        isMutating: isAdding || isUpdating || isRemoving,
        error,
        addProject,
        updateProject,
        removeProject,
    };
};