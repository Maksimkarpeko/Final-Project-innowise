"use client";

import { CvSkillsSection } from "@/src/features";
import { useCvNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";

type CVSkillsPageProps = {
  userId: string;
  cvId: string;
};

export const CVSkillsPage = ({ userId, cvId }: CVSkillsPageProps) => {
  const navItems = useCvNavItems(userId, cvId);

  return (
    <div className="w-full">
      <NavHeader items={navItems} />
      <div className="w-full px-4 md:px-8 lg:px-0">
        <CvSkillsSection cvId={cvId} />
      </div>
    </div>
  );
};
