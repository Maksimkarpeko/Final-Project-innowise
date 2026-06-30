"use client";

import { CVPreviewInfo } from "@/src/features";
import { useCvNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";
import { FC } from "react";

type CVPreviewProps = {
  userId: string;
  cvId: string;
};

export const CVPreview: FC<CVPreviewProps> = ({ cvId, userId }) => {
  const navItems = useCvNavItems(userId, cvId);

  return (
    <>
      <NavHeader items={navItems} />
      <CVPreviewInfo cvId={cvId} />
    </>
  );
};
