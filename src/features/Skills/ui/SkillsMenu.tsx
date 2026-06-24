"use client";
import { getProfile } from "@/src/entities";
import {
  deleteProfileSkills,
  getSkillCategories,
} from "@/src/entities/skills/api/skills.api";
import {
  getUserId,
  MasteryNumeric,
  ProfileResponse,
  SkillCategories,
  SkillMastery,
} from "@/src/shared";
import { CurrentSkill } from "@/src/views/user/skills/type";
import { useMutation, useQuery } from "@apollo/client/react";
import { Button, Progress, Space, Typography } from "antd";
import clsx from "clsx";
import { Plus, Trash2 } from "lucide-react";
import React, { FC, useState } from "react";
const { Text } = Typography;

type SkillsMenuProps = {
  isOpenAdd: boolean;
  setIsOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenUpdate: boolean;
  setIsOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSkill: React.Dispatch<React.SetStateAction<CurrentSkill>>;
};

export const SkillsMenu: FC<SkillsMenuProps> = ({
  isOpenAdd,
  setIsOpenAdd,
  isOpenUpdate,
  setIsOpenUpdate,
  setCurrentSkill,
}) => {
  const userId = getUserId();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<Array<string>>([]);
  const counterLengthDeleteItem = deleteItem.length;
  const { data: categoriesData, loading } =
    useQuery<SkillCategories>(getSkillCategories);
  const { data: profile } = useQuery<ProfileResponse>(getProfile, {
    variables: { userId },
    skip: !userId || loading,
  });
  const [deleteItems, { error }] = useMutation(deleteProfileSkills);

  if (loading) {
    return <>Loading...</>;
  }

  const skills = profile?.profile.skills || [];

  const categories = categoriesData?.skillCategories || [];

  const handleButtonSkills = (skill: SkillMastery) => {
    if (isDelete) {
      if (deleteItem.includes(skill.name)) {
        setDeleteItem(deleteItem.filter((name) => name !== skill.name));
      } else {
        setDeleteItem([...deleteItem, skill.name]);
      }
    } else {
      setCurrentSkill({
        id: skill.categoryId,
        name: skill.name,
        mastery: skill.mastery,
      });
      setIsOpenUpdate(!isOpenUpdate);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItems({
        variables: {
          skill: {
            userId,
            name: deleteItem,
          },
        },
        refetchQueries: [{ query: getProfile, variables: { userId } }],
      });
      setDeleteItem([]);
    } catch (erorr) {
      console.error(erorr);
    }
  };

  const groupedSkills = skills.reduce<Record<string, typeof skills>>(
    (acc, skill) => {
      if (!acc[skill.categoryId]) acc[skill.categoryId] = [];
      acc[skill.categoryId].push(skill);
      return acc;
    },
    {},
  );
  const sortedCategories = [...categories].sort(
    (a, b) => Number(a.id) - Number(b.id),
  );

  return (
    <div className="flex flex-col ml-0 md:ml-[20%] gap-10 md:gap-20">
      <div>
        {sortedCategories
          .filter((cat) => groupedSkills[cat.id])
          .map((category) => (
            <div key={category.id} className="mb-5">
              <Typography.Title
                level={5}
                style={{ color: "#000000", marginBottom: "16px" }}
              >
                {category.name}
              </Typography.Title>
              <div className="flex flex-wrap gap-4">
                {groupedSkills[category.id].map((skill) => (
                  <Button
                    key={skill.name}
                    type="text"
                    className="flex! items-center! gap-2! h-auto! px-8! py-2! rounded-full! border-none! hover:bg-gray-100!"
                    onClick={() => handleButtonSkills(skill)}
                  >
                    <Progress
                      percent={MasteryNumeric[skill.mastery]}
                      strokeColor={
                        MasteryNumeric[skill.mastery] <= 20
                          ? "#a7a8a7"
                          : MasteryNumeric[skill.mastery] <= 40
                            ? "#23e0e0"
                            : MasteryNumeric[skill.mastery] <= 60
                              ? "#37d431"
                              : MasteryNumeric[skill.mastery] <= 80
                                ? "#d6da18"
                                : "#db281b"
                      }
                      strokeWidth={4}
                      showInfo={false}
                      style={{ width: "80px", margin: 0 }}
                    />
                    <Text style={{ color: "#000000", fontSize: "20px" }}>
                      {skill.name}
                    </Text>
                  </Button>
                ))}
              </div>
            </div>
          ))}
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
      <div className="flex  md:flex-row justify-end items-center gap-3 md:gap-6 w-full md:w-[80%] p-4">
        {isDelete ? (
          <>
            <Button
              type="text"
              className="group! flex! items-center! text-[14px]! md:text-[16px]! border! border-gray-300! text-[#888888]! font-medium! tracking-wide! hover:bg-gray-100! hover:text-black! px-6! md:px-15! py-4! md:py-7! rounded-4xl!"
              onClick={() => {
                setIsDelete(false);
                setDeleteItem([]);
              }}
            >
              CLOSE
            </Button>
            <Button
              type="text"
              icon={<Trash2 size={16} />}
              className={clsx(
                "flex! items-center! font-medium! tracking-wide! text-[14px]! md:text-[16px]! hover:text-white! px-6! md:px-15! py-4! md:py-7! rounded-4xl!",
                counterLengthDeleteItem >= 1
                  ? "bg-red-500! text-white! hover:bg-[#df0703]!"
                  : "bg-gray-200! text-gray-600! hover:bg-[#696969]!",
              )}
              onClick={handleDelete}
            >
              REMOVE SKILLS{" "}
              {counterLengthDeleteItem >= 1 && (
                <span className="bg-white  rounded-full w-10 text-xl text-black">
                  {counterLengthDeleteItem}
                </span>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="text"
              icon={
                <Plus size={16} className="text-[#666666] transition-colors" />
              }
              className="group! flex! items-center! text-[14px]! md:text-[16px]! text-[#888888]! font-medium! tracking-wide! hover:bg-gray-100! hover:text-black! px-6! md:px-15! py-4! md:py-7! rounded-4xl!"
              onClick={() => setIsOpenAdd(!isOpenAdd)}
            >
              ADD SKILL
            </Button>
            <Button
              type="text"
              icon={<Trash2 size={16} />}
              className="flex! items-center! text-[14px]! md:text-[16px]! text-[#fd0004]! font-medium! tracking-wide! hover:bg-[#fa2c28]! hover:text-white! px-6! md:px-15! py-4! md:py-7! rounded-4xl!"
              onClick={() => setIsDelete(!isDelete)}
            >
              REMOVE SKILLS
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
