"use client";

import { useMutation, useQuery } from "@apollo/client/react";

import { GET_CV_DETAILS, UPDATE_CV_DETAILS } from "@/src/entities"
import {
    CVDetailsFormValues,
    GetCVDetailsResponse,
    GetCVDetailsVariables,
    UpdateCVDetailsResponse,
    UpdateCVDetailsVariables,
} from "../model/types";

type UseCVDetailsParams = {
    cvId: string;
};

export const useCVDetails = ({ cvId }: UseCVDetailsParams) => {
    const {
        data,
        loading: isLoading,
        error,
    } = useQuery<GetCVDetailsResponse, GetCVDetailsVariables>(GET_CV_DETAILS, {
        variables: {
            cvId,
        },
        skip: !cvId,
        fetchPolicy: "cache-and-network",
    });

    const [updateCV, { loading: isUpdating }] = useMutation<
        UpdateCVDetailsResponse,
        UpdateCVDetailsVariables
    >(UPDATE_CV_DETAILS);

    const updateCVDetails = (values: CVDetailsFormValues) => {
        return updateCV({
            variables: {
                cv: {
                    cvId,
                    name: values.name,
                    education: values.education,
                    description: values.description,
                },
            },
            refetchQueries: [
                {
                    query: GET_CV_DETAILS,
                    variables: {
                        cvId,
                    },
                },
            ],
        });
    };

    return {
        cv: data?.cv ?? null,
        isLoading,
        isUpdating,
        error,
        updateCVDetails,
    };
};