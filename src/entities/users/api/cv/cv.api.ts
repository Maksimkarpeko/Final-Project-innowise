import { gql } from "@apollo/client";

export const GET_USER_CVS = gql`
  query GetUserCVS($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        id
        full_name
      }
      cvs {
        id
        created_at
        name
        education
        description
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
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
    }
  }
`;

export const GET_CV_DETAILS = gql`
  query GetCVDetails($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
    }
  }
`;

export const UPDATE_CV_DETAILS = gql`
  mutation UpdateCVDetails($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;

export const GET_CV_SKILLS = gql`
  query GetCVSkills($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const GET_SKILL_CATEGORIES = gql`
  query GetSkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
      children {
        id
        name
        order
      }
    }
  }
`;

export const ADD_CV_SKILL = gql`
  mutation AddCVSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCVSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const DELETE_CV_SKILL = gql`
  mutation DeleteCVSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category {
        id
        name
      }
      category_name
      category_parent_name
    }
  }
`;
