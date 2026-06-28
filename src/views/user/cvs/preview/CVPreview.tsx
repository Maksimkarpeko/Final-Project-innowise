import { CVPreviewInfo } from "@/src/features";
import { PATH, UserCvIdPageProps } from "@/src/shared";
import { NavHeader } from "@/src/widgets";
import { FC } from "react";

type CVPreviewProps = {
  userId: string;
  cvId: string;
};

export const CVPreview: FC<CVPreviewProps> = ({ cvId, userId }) => {
  const navItems = [
    {
      content: "Details",
      href: PATH.USER.CV.DETAILS(userId, cvId),
    },
    {
      content: "Skills",
      href: PATH.USER.CV.SKILLS(userId, cvId),
    },
    {
      content: "Projects",
      href: PATH.USER.CV.PROJECTS(userId, cvId),
    },
    {
      content: "Preview",
      href: PATH.USER.CV.PREVIEW(userId, cvId),
    },
  ];
  return (
    <>
      <NavHeader items={navItems} />
      <CVPreviewInfo cvId={cvId} />
    </>
  );
};
