"use client";
import { getProfile, getSkills } from "@/src/entities";
import {
  FloatingSelect,
  getUserId,
  MasteryObject,
  ProfileResponse,
  SkillsResponse,
} from "@/src/shared";
import { useMutation, useQuery } from "@apollo/client/react";
import { Modal } from "antd";
import { FC, SetStateAction, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { schemaSkill, SchemaSkillValues } from "./schemaSkill";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProfileSkills,
  updateProfileSkills,
} from "@/src/entities/skills/api/skills.api";
import { CurrentSkill } from "@/src/views/user/skills/type";

type ModalSkillProps = {
  version: "add" | "update";
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  currentSkill: CurrentSkill;
  setCurrentSkill: React.Dispatch<SetStateAction<CurrentSkill>>;
};

export const ModalSkill: FC<ModalSkillProps> = ({
  version,
  isOpen,
  setIsOpen,
  currentSkill,
  setCurrentSkill,
}) => {
  const userId = getUserId();
  const { data } = useQuery<SkillsResponse>(getSkills);
  const [addSkills, { error, loading }] = useMutation(addProfileSkills);
  const { data: dataProfile } = useQuery<ProfileResponse>(getProfile, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  const [updateSkills, { error: errorUpdate }] =
    useMutation(updateProfileSkills);
  const { control, handleSubmit, reset } = useForm<SchemaSkillValues>({
    resolver: zodResolver(schemaSkill),
    mode: "onChange",
  });

  const title = version === "add" ? "Add skill" : "Update skill";
  useEffect(() => {
    if (isOpen) {
      if (version === "update" && currentSkill.name) {
        const matchingSkill = data?.skills.find(
          (s) => s.name === currentSkill.name,
        );
        reset({
          name: matchingSkill?.id || "",
          mastery: currentSkill.mastery,
        });
      } else {
        reset({
          name: "",
          mastery: "",
        });
      }
    }
  }, [isOpen, version, currentSkill, data, reset]);
  
  const selectOptions = useMemo(() => {
    if (!data?.skills || !Array.isArray(data.skills)) return [];

    const userSkillNames = new Set(
      dataProfile?.profile.skills.map((skill) => skill.name) || [],
    );

    const grouped: Record<
      string,
      {
        categoryId: number;
        categoryName: string;
        skillsList: { value: string; label: string }[];
      }
    > = {};

    data.skills.forEach((skill) => {
      if (version === "add" && userSkillNames.has(skill.name)) {
        return;
      }

      const categoryId = Number(skill.category?.id ?? 999);
      const categoryName = skill.category?.name || "Other";

      if (!grouped[categoryId]) {
        grouped[categoryId] = {
          categoryId,
          categoryName,
          skillsList: [],
        };
      }

      grouped[categoryId].skillsList.push({
        value: skill.id,
        label: skill.name,
      });
    });

    const flatOptions: {
      value: string;
      label: string;
      disabled?: boolean;
    }[] = [];

    Object.values(grouped)
      .sort((a, b) => a.categoryId - b.categoryId)
      .forEach((group) => {
        flatOptions.push({
          value: `heading-${group.categoryId}`,
          label: `ーー ${group.categoryName} ーー`,
          disabled: true,
        });

        flatOptions.push(
          ...group.skillsList.sort((a, b) => a.label.localeCompare(b.label)),
        );
      });

    return flatOptions;
  }, [data, dataProfile, version]);

  const handleSkills = async (formData: SchemaSkillValues) => {
    try {
      const selectedSkill = data?.skills.find(
        (skill) =>
          skill.id === formData.name || skill.name === currentSkill.name,
      );

      const categoryId =
        version === "add" ? selectedSkill?.category?.id : currentSkill.id;
      const actualSkillName =
        version === "add" ? selectedSkill?.name : currentSkill.name;

      const mutationFn = version === "add" ? addSkills : updateSkills;

      await mutationFn({
        variables: {
          skill: {
            userId,
            categoryId,
            name: actualSkillName,
            mastery: formData.mastery,
          },
        },
        refetchQueries: [{ query: getProfile, variables: { userId } }],
      });

      setIsOpen(false);
      setCurrentSkill({ id: "", mastery: "", name: "" });
      reset({ mastery: "", name: "" });
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
    setCurrentSkill({
      id: "",
      mastery: "",
      name: "",
    });
    reset({ mastery: "", name: "" });
  };
  return (
    <Modal
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      onCancel={handleCancel}
      okText={"Submit"}
      onOk={handleSubmit(handleSkills)}
      okButtonProps={{ loading }}
      cancelText="Cancel"
      width={650}
    >
      <form action="" onSubmit={handleSubmit(handleSkills)}>
        <div className="mt-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FloatingSelect
                label="Skill"
                options={selectOptions}
                disabled={version === "update" ? true : false}
                defaultValue={currentSkill.name}
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-7">
          <Controller
            name="mastery"
            control={control}
            render={({ field }) => (
              <FloatingSelect
                label="Skill mastery"
                options={Object.entries(MasteryObject).map(([key, value]) => ({
                  value: value,
                  label: key,
                }))}
                defaultValue={currentSkill.mastery}
                {...field}
              />
            )}
          />
        </div>
        {error && <span className="text-red-500">{error.message}</span>}
        {errorUpdate && (
          <span className="text-red-500">{errorUpdate.message}</span>
        )}
      </form>
    </Modal>
  );
};
