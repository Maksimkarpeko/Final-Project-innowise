"use client";

import { useState } from "react";
import { Avatar, Menu, Button, Dropdown, MenuProps } from "antd";
import { getItems } from "./menuItem";
import { useQuery } from "@apollo/client/react";
import { getUserById } from "@/src/entities";
import { getUserId, logOut, PATH, UserResponse, useLocale } from "@/src/shared";
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

  const getSelectedSidebarKey = (pathname: string) => {
    if (pathname === PATH.USER.SIDE_SKILLS) {
      return PATH.USER.SIDE_SKILLS;
    }

    if (/^\/users\/[^/]+\/skills$/.test(pathname)) {
      return PATH.USER.SIDE_SKILLS;
    }

    if (pathname === PATH.USER.SIDE_LANGUAGES) {
      return PATH.USER.SIDE_LANGUAGES;
    }

    if (/^\/users\/[^/]+\/languages$/.test(pathname)) {
      return PATH.USER.SIDE_LANGUAGES;
    }

    if (userId && pathname.startsWith(`/users/${userId}/cv`)) {
      return PATH.USER.CV.LIST(userId);
    }

    return pathname;
  };

  const selectedSidebarKey = getSelectedSidebarKey(path);

  const { t } = useLocale();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { data, loading } = useQuery<UserResponse>(getUserById, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });

  const fullName = data?.user?.profile?.full_name ?? "";
  const firstLetter =
      fullName?.[0]?.toUpperCase() ||
      data?.user?.email?.[0]?.toUpperCase() ||
      "?";

  const profileMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
          <Link href={PATH.USER.PROFILE(userId)}>
            {t.sidebar.profileMenu.profile}
          </Link>
      ),
      icon: <User size={16} />,
    },
    {
      type: "divider",
    },
    {
      key: "settings",
      label: (
          <Link href={PATH.USER.SETTINGS}>
            {t.sidebar.profileMenu.settings}
          </Link>
      ),
      icon: <Settings size={16} />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
          <Link href={PATH.AUTH.LOGIN} onClick={() => logOut()}>
            {t.sidebar.profileMenu.logout}
          </Link>
      ),
      icon: <LogOut size={16} />,
      danger: true,
    },
  ];

  const items = getItems(userId, t);

  return (
      <div
          className={`fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-2 transition-all duration-300
        dark:border-white/10 dark:bg-[#303030]
        md:relative md:bottom-auto md:left-auto md:z-0 md:h-full md:flex-col md:border-t-0 md:bg-transparent md:p-0 dark:md:bg-transparent
        ${isCollapsed ? "md:w-20" : "md:w-50"}`}
      >
        <div className="block flex-1 md:hidden">
          <Menu
              defaultSelectedKeys={[path]}
              selectedKeys={[selectedSidebarKey]}
              mode="horizontal"
              items={items}
              className="
            flex-1
            border-0!
            bg-transparent!

            [&_.ant-menu-item]:mt-0!
            [&_.ant-menu-item]:text-[#767676]!
            dark:[&_.ant-menu-item]:text-white/60!

            [&_.ant-menu-item-selected]:!text-[#2E2E2E]
            [&_.ant-menu-item-selected_a]:!text-[#2E2E2E]
            dark:[&_.ant-menu-item-selected]:!text-white
            dark:[&_.ant-menu-item-selected_a]:!text-white
            dark:[&_.ant-menu-item-selected_svg]:!text-white

            dark:[&_.ant-menu-item-selected_.skills-menu-icon]:!opacity-100
            dark:[&_.ant-menu-item-selected_.skills-menu-icon]:!brightness-0
            dark:[&_.ant-menu-item-selected_.skills-menu-icon]:!invert
          "
          />
        </div>

        <div className="relative hidden w-full flex-1 md:block">
          <Menu
              inlineCollapsed={isCollapsed}
              defaultSelectedKeys={[path]}
              selectedKeys={[selectedSidebarKey]}
              defaultOpenKeys={["employees"]}
              mode="inline"
              items={items}
              className="
            border-0!
            bg-transparent!
            pt-5!

            [&_.ant-menu-item]:mt-2!
            [&_.ant-menu-item]:rounded-r-3xl!
            [&_.ant-menu-item]:text-[#767676]!
            dark:[&_.ant-menu-item]:text-white/60!

            [&_.ant-menu-item:hover]:text-[#2E2E2E]!
            dark:[&_.ant-menu-item:hover]:text-white!

            [&_.ant-menu-item-selected]:bg-black/5!
            [&_.ant-menu-item-selected]:text-[#2E2E2E]!
            [&_.ant-menu-item-selected_a]:text-[#2E2E2E]!

            dark:[&_.ant-menu-item-selected]:bg-white/10!
            dark:[&_.ant-menu-item-selected]:!text-white!
            dark:[&_.ant-menu-item-selected_a]:!text-white
            dark:[&_.ant-menu-item-selected_svg]:!text-white
            dark:[&_.ant-menu-item-selected_.ant-menu-title-content]:!text-white
            dark:[&_.ant-menu-item-selected_.ant-menu-title-content_a]:!text-white

            [&_.ant-menu-item_.ant-menu-item-icon]:min-w-6!
            [&_.ant-menu-item_.ant-menu-item-icon]:text-current!
            [&_.ant-menu-item-selected_.ant-menu-item-icon]:text-current!

            dark:[&_.ant-menu-item-selected_.skills-menu-icon]:!opacity-100
            dark:[&_.ant-menu-item-selected_.skills-menu-icon]:!brightness-0
            dark:[&_.ant-menu-item-selected_.skills-menu-icon]:!invert

            dark:[&_.ant-menu-item:not(.ant-menu-item-selected)_.skills-menu-icon]:!opacity-60
            dark:[&_.ant-menu-item:not(.ant-menu-item-selected)_.skills-menu-icon]:!brightness-0
            dark:[&_.ant-menu-item:not(.ant-menu-item-selected)_.skills-menu-icon]:!invert
          "
          />
        </div>

        <div
            className={`flex items-center pb-0 transition-all md:w-full md:pb-15 md:pl-5 ${
                isCollapsed ? "w-full pl-0" : ""
            }`}
        >
          {loading ? (
              <span className="text-sm text-gray-400 dark:text-white/50">
            {t.common.loading}
          </span>
          ) : (
              <div className="flex flex-col gap-2">
                <Dropdown
                    menu={{
                      items: profileMenuItems,
                      className: `
                  [&_.ant-dropdown-menu]:!bg-white
                  dark:[&_.ant-dropdown-menu]:!bg-[#303030]

                  [&_.ant-dropdown-menu-item]:!text-[#2E2E2E]
                  dark:[&_.ant-dropdown-menu-item]:!text-white/80

                  dark:[&_.ant-dropdown-menu-item:hover]:!bg-white/10
                  dark:[&_.ant-dropdown-menu-item-icon]:!text-white/70
                `,
                    }}
                    trigger={["click"]}
                >
                  <div className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80">
                    <Avatar
                        size="large"
                        src={data?.user?.profile?.avatar || undefined}
                        className="
                    bg-[#D32F2F]!
                    font-medium!
                    text-[#303030]!
                    dark:bg-[#D32F2F]!
                    dark:text-[#303030]!
                  "
                    >
                      {!data?.user?.profile?.avatar ? firstLetter : null}
                    </Avatar>

                    <div
                        className={`md:flex md:flex-col ${
                            isCollapsed ? "md:hidden" : ""
                        }`}
                    >
                      {!fullName ? (
                          <>
                      <span className="whitespace-nowrap text-[16px] font-medium text-gray-700 dark:!text-white">
                        {t.sidebar.userFallback.name}
                      </span>

                            <span className="whitespace-nowrap text-[14px] leading-tight text-gray-400 dark:!text-white/60">
                        {t.sidebar.userFallback.hint}
                      </span>
                          </>
                      ) : (
                          <span className="whitespace-nowrap text-[15px] font-medium text-gray-700 dark:!text-white">
                      {fullName}
                    </span>
                      )}
                    </div>
                  </div>
                </Dropdown>

                <div className="hidden md:block">
                  <Button
                      type="text"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      className="
                  text-[#767676]!
                  hover:bg-black/5!
                  hover:text-[#2E2E2E]!
                  dark:text-white/60!
                  dark:hover:bg-white/10!
                  dark:hover:text-white!
                "
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