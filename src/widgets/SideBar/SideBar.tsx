"use client";
import { Avatar, Menu } from "antd";
import { items } from "./menuItem";
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

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-2 md:relative md:bottom-auto md:left-auto md:z-0 md:h-full md:w-50 md:flex-col md:border-t-0 md:bg-transparent md:p-0">
      <div className="block md:hidden flex-1">
        <Menu
          defaultSelectedKeys={[path]}
          mode="horizontal"
          items={items}
          className="border-0! flex-1 [&_.ant-menu-item]:mt-0!"
        />
      </div>

      <div className="hidden md:block">
        <Menu
          style={{ width: 200 }}
          defaultSelectedKeys={[path]}
          defaultOpenKeys={["employees"]}
          mode="inline"
          items={items}
          className="border-0! pt-5! [&_.ant-menu-item]:mt-2! [&_.ant-menu-item]:rounded-r-3xl!"
        />
      </div>

      <div className="flex items-center pl-0 md:pl-3 pb-0 md:pb-15">
        {loading ? (
          <span className="text-gray-400 text-sm">Loading...</span>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar
              size="large"
              src={data?.profile?.avatar}
              icon={!data?.profile?.avatar && <User />}
            />
            <div className="md:flex md:flex-col">
              {!data?.profile?.full_name ? (
                <>
                  <span className="text-[16px] font-medium text-gray-700">
                    Noname
                  </span>
                  <span className="text-[14px] text-gray-400 leading-tight">
                    You need to fill in the details
                  </span>
                </>
              ) : (
                <span className="text-[15px] font-medium text-gray-700">
                  {data?.profile.full_name}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
