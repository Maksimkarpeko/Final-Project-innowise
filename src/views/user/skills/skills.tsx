"use client";

import { getProfile } from "@/src/entities";
import { SkillsMenu } from "@/src/features";
import {
  getUserId,
  ProfileResponse,
  useCvNavItems,
  useLocale,
  useProfileNavItems,
} from "@/src/shared";
import { ModalSkill } from "@/src/widgets/ModalSkill";
import { useQuery } from "@apollo/client/react";
import { Button, Spin } from "antd";
import { useState } from "react";
import { CurrentSkill } from "./type";
import { NavHeader } from "@/src/widgets";

type UserProfilePageProps = {
  currentUserId?: string;
  currentCvUserId?: string;
};

export const UserSkillsPage = ({
                                 currentUserId,
                                 currentCvUserId,
                               }: UserProfilePageProps) => {
  const userId = getUserId();
  const { t } = useLocale();

  const profileUserId = currentUserId || userId;
  const isCanEdit = currentUserId ? userId === currentUserId : true;

  const [currentSkill, setCurrentSkill] = useState<CurrentSkill>({
    id: "",
    name: "",
    mastery: "",
  });

  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

  const { data, loading } = useQuery<ProfileResponse>(getProfile, {
    variables: {
      userId: profileUserId,
    },
    skip: !profileUserId,
  });

  const navItems = useProfileNavItems(profileUserId || "");
  const navCvItems = useCvNavItems(profileUserId || "", currentCvUserId || "");

  const hasSkills = !!data?.profile.skills.length;

  return (
      <>
        {currentCvUserId && <NavHeader items={navCvItems} />}

        <div className="w-full px-6">
          {currentUserId && <NavHeader items={navItems} />}

          <div>
            {loading ? (
                <div className="flex min-h-[220px] w-full items-center justify-center">
                  <Spin />
                </div>
            ) : hasSkills ? (
                <SkillsMenu
                    profileUserId={profileUserId}
                    isCanEdit={isCanEdit}
                    isOpenAdd={isOpenAdd}
                    setIsOpenAdd={setIsOpenAdd}
                    isOpenUpdate={isOpenUpdate}
                    setIsOpenUpdate={setIsOpenUpdate}
                    setCurrentSkill={setCurrentSkill}
                />
            ) : (
                <div
                    className="
                flex
                min-h-[220px]
                w-full
                flex-col
                items-center
                justify-center
                px-4
                text-center
              "
                >
                  <p
                      className="
                  text-[16px]
                  font-normal
                  leading-[24px]
                  text-[#8a8a8a]
                  transition-colors

                  dark:text-white/55
                "
                  >
                    No skills have been added yet
                  </p>

                  {isCanEdit && (
                      <Button
                          type="text"
                          className="
                    group!
                    mt-6
                    flex!
                    h-[48px]!
                    items-center!
                    justify-center!
                    rounded-[40px]!
                    border-none!
                    bg-transparent!
                    px-8!
                    text-[14px]!
                    font-medium!
                    uppercase!
                    leading-[24.5px]!
                    tracking-[0.4px]!
                    text-[#888888]!
                    shadow-none!
                    transition-colors!

                    hover:bg-gray-100!
                    hover:text-[#2E2E2E]!

                    dark:bg-transparent!
                    dark:text-white/45!
                    dark:hover:bg-white/8!
                    dark:hover:text-white/70!

                    md:px-15!
                    md:text-[16px]!
                  "
                          onClick={() => setIsOpenAdd(true)}
                      >
                        {t.skills.actions.addNew}
                      </Button>
                  )}
                </div>
            )}

            {isOpenAdd && (
                <ModalSkill
                    version="add"
                    isOpen={isOpenAdd}
                    setIsOpen={setIsOpenAdd}
                    currentSkill={currentSkill}
                    setCurrentSkill={setCurrentSkill}
                />
            )}

            {isOpenUpdate && (
                <ModalSkill
                    version="update"
                    isOpen={isOpenUpdate}
                    setIsOpen={setIsOpenUpdate}
                    currentSkill={currentSkill}
                    setCurrentSkill={setCurrentSkill}
                />
            )}
          </div>
        </div>
      </>
  );
};