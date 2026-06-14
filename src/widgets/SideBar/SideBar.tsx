"use client";

import { Avatar, Menu } from "antd";
import { items } from "./menuItem";
import { useQuery } from "@apollo/client/react";
import { getProfile } from "@/src/entities";
import { getUserId } from "@/src/shared/utils/workOnLocalStorage";
import { Profile } from "@/src/shared";

export const SideBar = () => {
  const userId = getUserId();

  const { data, loading, error } = useQuery<Profile>(getProfile, {
    variables: { userId: userId },
    skip: !userId,
  });

  if (error) {
    console.log(error);
  }
  console.log(data);
  

  return (
    <div className="flex flex-col">
      <Menu
        style={{ width: 200 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["employees"]}
        mode="inline"
        items={items}
        className="border-0! pt-5! [&_.ant-menu-item]:mt-2! [&_.ant-menu-item]:rounded-r-3xl!"
      />

      <div className="flex">
        <Avatar size="large" />
        {data?.id}
        <span></span>
      </div>
    </div>
  );
};
