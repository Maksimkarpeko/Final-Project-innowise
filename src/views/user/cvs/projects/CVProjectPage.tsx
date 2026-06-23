import { CvProjectsSection } from "@/src/features";
import { NavHeader } from "@/src/widgets";
import {PATH} from "@/src/shared";

type CVProjectsPageProps = {
    userId: string;
    cvId: string;
};

export const CVProjectsPage = ({ userId, cvId }: CVProjectsPageProps) => {

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
        <div className="w-full bg-white">
            <NavHeader items={navItems} />

            <div className="w-full px-4 pt-[44px] md:px-8 lg:px-0">
                <CvProjectsSection cvId={cvId} />
            </div>
        </div>
    );
};