import { gql } from "@apollo/client";

export const GET_CV_PROJECTS = gql`
  query GetCVProjects($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        roles
        responsibilities
        project {
          id
          name
          internal_name
          domain
          start_date
          end_date
          description
          environment
        }
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;

export const ADD_CV_PROJECT = gql`
  mutation AddCVProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        roles
        responsibilities
        project {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_CV_PROJECT = gql`
  mutation UpdateCVProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        roles
        responsibilities
        project {
          id
          name
        }
      }
    }
  }
`;

export const REMOVE_CV_PROJECT = gql`
  mutation RemoveCVProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
        environment
        roles
        responsibilities
        project {
          id
          name
        }
      }
    }
  }
`;