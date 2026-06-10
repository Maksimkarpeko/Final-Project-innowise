"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PATH } from "@/src/shared";

const TAB_BASE_CLASS_NAME = `
  flex
  h-[48px]
  w-[150px]
  items-center
  justify-center
  rounded-none
  border-0
  bg-transparent
  p-0
  [font-family:Roboto,sans-serif]
  text-[14px]
  uppercase
  leading-[17.5px]
  tracking-[0.4px]
  no-underline
  shadow-none
  hover:no-underline
  hover:bg-transparent
`;

const ACTIVE_TAB_CLASS_NAME = `
  !font-semibold
  !text-[#c63031]
  hover:!text-[#c63031]
`;

const INACTIVE_TAB_CLASS_NAME = `
  !font-medium
  !text-[#2e2e2e]
  hover:!text-[#2e2e2e]
`;

export const AuthHeader = () => {
  const pathname = usePathname();

  const isLoginActive = pathname === PATH.AUTH.LOGIN;
  const isSignUpActive = pathname === PATH.AUTH.REGISTER;

  return (
    <header className="h-[56px] w-full bg-[#f5f5f7]">
      <div className="relative top-[6px] mx-auto h-[50px] w-full max-w-[1440px] overflow-hidden">
        <nav
          aria-label="Auth navigation"
          className="relative mx-auto h-[50px] w-[300px]"
        >
          <div className="flex h-[48px] w-[300px]">
            <Link
              href={PATH.AUTH.LOGIN}
              aria-current={isLoginActive ? "page" : undefined}
              className={`
                ${TAB_BASE_CLASS_NAME}
                ${isLoginActive ? ACTIVE_TAB_CLASS_NAME : INACTIVE_TAB_CLASS_NAME}
            `}
            >
              Войти
            </Link>

            <Link
              href={PATH.AUTH.REGISTER}
              aria-current={isSignUpActive ? "page" : undefined}
              className={`
                ${TAB_BASE_CLASS_NAME}
                ${isSignUpActive ? ACTIVE_TAB_CLASS_NAME : INACTIVE_TAB_CLASS_NAME}
              `}
            >
              Создать
            </Link>
          </div>

          <div
            className={`
            absolute
            top-[48px]
            h-[2px]
            w-[150px]
          bg-[#c63031]
            ${isSignUpActive ? "left-[150px]" : "left-0"}
          `}
          />
        </nav>
      </div>
    </header>
  );
};
