"use client";

import { getToken, PATH } from "@/src/shared";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

export const AppGuard: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken("accessToken");

    if (!token) {
      router.push(PATH.AUTH.LOGIN);
    }
  }, [router]);

  return <>{children}</>;
};