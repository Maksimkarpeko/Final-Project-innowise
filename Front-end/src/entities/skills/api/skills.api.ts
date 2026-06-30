import { gql } from "@apollo/client";

export const getSkills = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
        name
        parent {
          name
        }
      }
    }
  }
`;

export const getSkillCategories = gql`
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
      }
    }
  }
`;

export const addProfileSkills = gql`
  mutation AddProfileSkills($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
    }
  }
`;
export const updateProfileSkills = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
    }
  }
`;
export const deleteProfileSkills = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
    }
  }
`;
