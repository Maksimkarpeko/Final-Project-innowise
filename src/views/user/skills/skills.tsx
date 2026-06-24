"use client";
import { getProfile } from "@/src/entities";
import { SkillsMenu } from "@/src/features";
import { getUserId, ProfileResponse } from "@/src/shared";
import { ModalSkill } from "@/src/widgets/ModalSkill";
import { useQuery } from "@apollo/client/react";
import { Button } from "antd";
import { useState } from "react";
import { CurrentSkill } from "./type";

export const UserSkillsPage = () => {
  const userId = getUserId();
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

  return (
    <div className="w-full px-6">
      <span className="text-black/60">skills</span>
      {!!data?.profile.skills.length ? (
        <SkillsMenu
          isOpenAdd={isOpenAdd}
          setIsOpenAdd={setIsOpenAdd}
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
          setCurrentSkill={setCurrentSkill}
        />
      ) : (
        <div className="flex justify-center w-full">
          <Button
            size="large"
            type="text"
            className="bg-white! text-gray-500! hover:text-gray-700! hover:bg-gray-100! font-medium! uppercase! tracking-wider! h-12! px-50! rounded-3xl!"
            onClick={() => {
              setIsOpenAdd(!isOpenAdd);
            }}
          >
            + Add new skill
          </Button>
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
  );
};
