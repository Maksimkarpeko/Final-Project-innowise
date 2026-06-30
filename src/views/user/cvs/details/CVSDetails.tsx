"use client";

import { CVDetailsForm } from "@/src/features";
import { useCvNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";

type UserIdPage = {
  userId: string;
  cvId: string;
};

export const CVSDetailsPage = ({ userId, cvId }: UserIdPage) => {
  const navItems = useCvNavItems(userId, cvId);

  return (
    <div className="w-full">
      <NavHeader items={navItems} />

      <div className="w-full px-4 pt-[56px] md:px-8 lg:px-0 lg:pt-[64px]">
        <CVDetailsForm key={cvId} cvId={cvId} />
      </div>
    </div>
  );
};
