"use client";

import { getProfile } from "@/src/entities";
import {
  deleteProfileSkills,
  getSkillCategories,
} from "@/src/entities/skills/api/skills.api";
import {
  MasteryNumeric,
  ProfileResponse,
  SkillCategories,
  SkillMastery,
  useLocale,
} from "@/src/shared";
import { CurrentSkill } from "@/src/views/user/skills/type";
import { useMutation, useQuery } from "@apollo/client/react";
import { Button, Progress, Typography } from "antd";
import clsx from "clsx";
import { Plus, Trash2 } from "lucide-react";
import React, { FC, useState } from "react";

const { Text } = Typography;

type SkillsMenuProps = {
  profileUserId: string;
  isOpenAdd: boolean;
  setIsOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenUpdate: boolean;
  setIsOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSkill: React.Dispatch<React.SetStateAction<CurrentSkill>>;
  isCanEdit: boolean;
};

export const SkillsMenu: FC<SkillsMenuProps> = ({
                                                  profileUserId,
                                                  isOpenAdd,
                                                  setIsOpenAdd,
                                                  isOpenUpdate,
                                                  setIsOpenUpdate,
                                                  setCurrentSkill,
                                                  isCanEdit,
                                                }) => {
  const { t } = useLocale();

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<Array<string>>([]);

  const counterLengthDeleteItem = deleteItem.length;

  const { data: categoriesData, loading } =
      useQuery<SkillCategories>(getSkillCategories);

    const { data: profile } = useQuery<ProfileResponse>(getProfile, {
        variables: { userId: profileUserId },
        skip: !profileUserId || loading,
    });

  const [deleteItems, { error }] = useMutation(deleteProfileSkills);

  if (loading) {
    return <>{t.common.loading}</>;
  }

  const skills = profile?.profile.skills || [];
  const categories = categoriesData?.skillCategories || [];

    const handleButtonSkills = (skill: SkillMastery) => {
        if (!isCanEdit) {
            return;
        }

        if (isDelete) {
            if (deleteItem.includes(skill.name)) {
                setDeleteItem(deleteItem.filter((name) => name !== skill.name));
            } else {
                setDeleteItem([...deleteItem, skill.name]);
            }

            return;
        }

        setCurrentSkill({
            id: skill.categoryId,
            name: skill.name,
            mastery: skill.mastery,
        });

        setIsOpenUpdate(!isOpenUpdate);
    };

  const handleDelete = async () => {
    try {
        await deleteItems({
            variables: {
                skill: {
                    userId: profileUserId,
                    name: deleteItem,
                },
            },
            refetchQueries: [
                {
                    query: getProfile,
                    variables: { userId: profileUserId },
                },
            ],
        });

      setDeleteItem([]);
    } catch (error) {
      console.error(error);
    }
  };

  const groupedSkills = skills.reduce<Record<string, typeof skills>>(
      (acc, skill) => {
        if (!acc[skill.categoryId]) {
          acc[skill.categoryId] = [];
        }

        acc[skill.categoryId].push(skill);

        return acc;
      },
      {},
  );

  const sortedCategories = [...categories].sort(
      (a, b) => Number(a.id) - Number(b.id),
  );

  return (
      <div className="ml-0 flex flex-col gap-10 md:ml-[20%] md:gap-20">
        <div>
          {sortedCategories
              .filter((cat) => groupedSkills[cat.id])
              .map((category) => (
                  <div key={category.id} className="mb-5">
                    <Typography.Title
                        level={5}
                        className="
                  mb-4!
                  text-[#767676]!
                  transition-colors
                  dark:text-white/90!
                "
                    >
                      {category.name}
                    </Typography.Title>

                    <div className="flex flex-wrap gap-4">
                      {groupedSkills[category.id].map((skill) => {
                        const isSelectedToDelete = deleteItem.includes(skill.name);

                        return (
                            <Button
                                key={skill.name}
                                type="text"
                                className={clsx(
                                    `
                          flex!
                          h-auto!
                          items-center!
                          gap-2!
                          rounded-full!
                          border-none!
                          px-8!
                          py-2!
                          transition-colors!

                          hover:bg-gray-100!
                          dark:hover:bg-white/8!

                          active:bg-gray-100!
                          dark:active:bg-white/10!
                        `,
                                    isSelectedToDelete &&
                                    `
                            bg-gray-100!
                            dark:bg-white/10!
                          `,
                                )}
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

                              <Text
                                  className="
                          text-[20px]!
                          text-[#929292]!
                          transition-colors
                          dark:text-white/70!
                          group-hover:dark:text-white/90!
                        "
                              >
                                {skill.name}
                              </Text>
                            </Button>
                        );
                      })}
                    </div>
                  </div>
              ))}
        </div>

        {error && <span className="text-red-500">{error.message}</span>}

        <div className="flex w-full items-center justify-end gap-3 p-4 md:w-[80%] md:flex-row md:gap-6">
          {isCanEdit && (
              <>
                {isDelete ? (
                    <>
                      <Button
                          type="text"
                          className="
                    flex!
                    items-center!
                    rounded-4xl!
                    border!
                    border-[#D9D9D9]!
                    px-6!
                    py-4!
                    text-[14px]!
                    font-medium!
                    tracking-wide!
                    text-[#888888]!
                    transition-colors!

                    hover:border-[#BDBDBD]!
                    hover:bg-gray-100!
                    hover:text-[#2E2E2E]!

                    dark:border-white/20!
                    dark:text-white/55!

                    dark:hover:border-white/25!
                    dark:hover:bg-white/8!
                    dark:hover:text-white/75!

                    md:px-15!
                    md:py-7!
                    md:text-[16px]!
                  "
                          onClick={() => {
                            setIsDelete(false);
                            setDeleteItem([]);
                          }}
                      >
                        {t.common.close}
                      </Button>

                      <Button
                          type="text"
                          icon={<Trash2 size={16} />}
                          className={clsx(
                              `
                      flex!
                      items-center!
                      rounded-4xl!
                      px-6!
                      py-4!
                      text-[14px]!
                      font-medium!
                      tracking-wide!
                      transition-colors!

                      md:px-15!
                      md:py-7!
                      md:text-[16px]!
                    `,
                              counterLengthDeleteItem >= 1
                                  ? `
                        bg-red-500!
                        text-white!

                        hover:bg-[#df0703]!
                        hover:text-white!

                        dark:bg-red-500!
                        dark:text-white!
                        dark:hover:bg-[#df0703]!
                        dark:hover:text-white!
                      `
                                  : `
                        bg-gray-200!
                        text-gray-600!

                        hover:bg-gray-300!
                        hover:text-gray-700!

                        dark:bg-white/14!
                        dark:text-white/45!
                        dark:hover:bg-white/18!
                        dark:hover:text-white/55!
                      `,
                          )}
                          onClick={handleDelete}
                      >
                        {t.skills.actions.removeSkills}

                        {counterLengthDeleteItem >= 1 && (
                            <span
                                className="
                        flex
                        h-6
                        min-w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        px-2
                        text-[14px]
                        font-medium
                        text-black
                      "
                            >
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
                            <Plus
                                size={16}
                                className="
                        text-[#666666]
                        transition-colors
                        dark:text-white/45
                      "
                            />
                          }
                          className="
                    group!
                    flex!
                    items-center!
                    rounded-4xl!
                    px-6!
                    py-4!
                    text-[14px]!
                    font-medium!
                    tracking-wide!
                    text-[#888888]!
                    transition-colors!

                    hover:bg-gray-100!
                    hover:text-[#2E2E2E]!

                    dark:text-white/45!
                    dark:hover:bg-white/8!
                    dark:hover:text-white/70!

                    dark:hover:[&_.lucide]:text-white/70!

                    md:px-15!
                    md:py-7!
                    md:text-[16px]!
                  "
                          onClick={() => setIsOpenAdd(!isOpenAdd)}
                      >
                        {t.skills.actions.addSkill}
                      </Button>

                      <Button
                          type="text"
                          icon={<Trash2 size={16} />}
                          className="
                    flex!
                    items-center!
                    rounded-4xl!
                    px-6!
                    py-4!
                    text-[14px]!
                    font-medium!
                    tracking-wide!
                    text-[#fd0004]!
                    transition-colors!

                    hover:bg-[#fa2c28]!
                    hover:text-white!

                    dark:text-[#fd0004]!
                    dark:hover:bg-[#fa2c28]!
                    dark:hover:text-white!

                    md:px-15!
                    md:py-7!
                    md:text-[16px]!
                  "
                          onClick={() => setIsDelete(!isDelete)}
                      >
                        {t.skills.actions.removeSkills}
                      </Button>
                    </>
                )}
              </>
          )}
        </div>
      </div>
  );
};