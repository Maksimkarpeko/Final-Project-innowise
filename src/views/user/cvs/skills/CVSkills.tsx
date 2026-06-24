import { CvSkillsSection } from "@/src/features/CV";
import { PATH } from "@/src/shared";
import { NavHeader } from "@/src/widgets";

type CVSkillsPageProps = {
    userId: string;
    cvId: string;
};

export const CVSkillsPage = ({ userId, cvId }: CVSkillsPageProps) => {

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
        <div className="w-full">
            <NavHeader items={navItems} />
            <div className="w-full px-4 md:px-8 lg:px-0">
                <CvSkillsSection cvId={cvId} />
            </div>
        </div>
    );
};