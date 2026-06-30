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
import { Button } from "antd";
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
  let isCanEdit;
  if (currentUserId) {
    isCanEdit = userId === currentUserId;
  } else {
    isCanEdit = true;
  }
  const [currentSkill, setCurrentSkill] = useState<CurrentSkill>({
    id: "",
    name: "",
    mastery: "",
  });
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const { data } = useQuery<ProfileResponse>(getProfile, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  const navItems = useProfileNavItems(currentUserId || userId);
  const navCvItems = useCvNavItems(
    currentUserId || userId,
    currentCvUserId || "",
  );
  return (
    <>
      {currentCvUserId && <NavHeader items={navCvItems} />}
      <div className="w-full px-6">
        {currentUserId && <NavHeader items={navItems} />}
        {!!data?.profile.skills.length ? (
          <SkillsMenu
            isCanEdit={isCanEdit}
            isOpenAdd={isOpenAdd}
            setIsOpenAdd={setIsOpenAdd}
            isOpenUpdate={isOpenUpdate}
            setIsOpenUpdate={setIsOpenUpdate}
            setCurrentSkill={setCurrentSkill}
          />
        ) : (
          <div className="flex justify-center w-full">
            {isCanEdit && (
              <Button
                size="large"
                type="text"
                className="bg-white! text-gray-500! hover:text-gray-700! hover:bg-gray-100! font-medium! uppercase! tracking-wider! h-12! px-50! rounded-3xl!"
                onClick={() => {
                  setIsOpenAdd(!isOpenAdd);
                }}
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
    </>
  );
};
