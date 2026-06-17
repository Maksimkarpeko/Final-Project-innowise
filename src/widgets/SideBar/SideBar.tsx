"use client";

import { Avatar, Menu } from "antd";
import { getItems } from "./menuItem";
import { useQuery } from "@apollo/client/react";
import { getProfile } from "@/src/entities";
import { getUserId, ProfileResponse } from "@/src/shared";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export const SideBar = () => {
  const userId = getUserId();
  const path = usePathname();

  const { data, loading } = useQuery<ProfileResponse>(getProfile, {
    variables: { userId: userId },
    skip: !userId,
  });
  const items = getItems(userId);
  return (
    <div className="flex flex-col justify-between h-screen">
      <Menu
        style={{ width: 200 }}
        selectedKeys={[path]}
        defaultOpenKeys={["employees"]}
        mode="inline"
        items={items}
        className="border-0! pt-5! [&_.ant-menu-item]:mt-2! [&_.ant-menu-item]:rounded-r-3xl!"
      />

      <div className="flex pl-3 pb-15">
        {loading ? (
          <>Loading...</>
        ) : (
          <div className="flex gap-2">
            <Avatar size="large" icon={!data?.profile.avatar && <User />} />
            {!data?.profile.full_name ? (
              <div className="flex flex-col">
                <span className="text-[16px]">Noname</span>
                <span className="text-[14px]">
                  You need to fill in the details
                </span>
              </div>
            ) : (
              <span>{data?.profile.full_name}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
