"use client";
import { useState } from "react";
import { Avatar, Menu, Button, Dropdown, MenuProps } from "antd";
import { getItems } from "./menuItem";
import { useQuery } from "@apollo/client/react";
import { getUserById } from "@/src/entities";
import { getUserId, PATH, UserResponse } from "@/src/shared";
import { usePathname } from "next/navigation";
import {
  User,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export const SideBar = () => {
  const userId = getUserId();
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { data, loading } = useQuery<UserResponse>(getUserById, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });
  const profileMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href={PATH.USER.PROFILE(userId)}>Profile</Link>,
      icon: <User size={16} />,
    },
    {
      type: "divider",
    },
    {
      key: "settings",
      label: <Link href={PATH.USER.SETTINGS}>Settings</Link>,
      icon: <Settings size={16} />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOut size={16} />,
      danger: true,
    },
  ];
  const items = getItems(userId);

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-2 transition-all duration-300
        md:relative md:bottom-auto md:left-auto md:z-0 md:h-full md:flex-col md:border-t-0 md:bg-transparent md:p-0
        ${isCollapsed ? "md:w-20" : "md:w-50"}`}
    >
      <div className="block md:hidden flex-1">
        <Menu
          defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          mode="horizontal"
          items={items}
          className="border-0! flex-1 [&_.ant-menu-item]:mt-0!"
        />
      </div>

      <div className="hidden md:block relative w-full flex-1">
        <Menu
          inlineCollapsed={isCollapsed}
          defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          defaultOpenKeys={["employees"]}
          mode="inline"
          items={items}
          className="border-0! pt-5! [&_.ant-menu-item]:mt-2! [&_.ant-menu-item]:rounded-r-3xl! [&_.ant-menu-item_.ant-menu-item-icon]:min-w-6!"
        />
      </div>

      <div
        className={`flex items-center pb-0 md:pb-15 transition-all ${isCollapsed ? "pl-0 justify-center w-full" : ""}`}
      >
        {loading ? (
          <span className="text-gray-400 text-sm">Loading...</span>
        ) : (
          <div className="flex flex-col gap-2">
            <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar
                  size="large"
                  src={data?.user?.profile?.avatar}
                  icon={!data?.user?.profile?.avatar && <User />}
                />
                <div
                  className={`md:flex md:flex-col ${isCollapsed ? "md:hidden" : ""}`}
                >
                  {!data?.user?.profile?.full_name ? (
                    <>
                      <span className="text-[16px] font-medium text-gray-700 whitespace-nowrap">
                        Noname
                      </span>
                      <span className="text-[14px] text-gray-400 leading-tight whitespace-nowrap">
                        You need to fill in the details
                      </span>
                    </>
                  ) : (
                    <span className="text-[15px] font-medium text-gray-700 whitespace-nowrap">
                      {data?.user?.profile?.full_name}
                    </span>
                  )}
                </div>
              </div>
            </Dropdown>
            <div className="hidden md:block">
              <Button
                type="text"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className=""
                icon={
                  isCollapsed ? (
                    <ChevronRight size={14} />
                  ) : (
                    <ChevronLeft size={14} />
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
