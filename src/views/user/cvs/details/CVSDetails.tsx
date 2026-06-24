import { CVDetailsForm } from "@/src/features/CV";
import { NavHeader } from "@/src/widgets";
import {PATH} from "@/src/shared";

type UserIdPage = {
    userId: string;
    cvId: string;
};

export const CVSDetailsPage = ({ userId, cvId }: UserIdPage) => {

    const navItems = [
        {
            content: "Details",
            href: PATH.USER.CV.DETAILS(userId, cvId),
        },
        {
            content: "Skills",
            href: PATH.USER.SKILLS(userId),
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

            <div className="w-full px-4 pt-[56px] md:px-8 lg:px-0 lg:pt-[64px]">
                <CVDetailsForm key={cvId} cvId={cvId} />
            </div>
        </div>
    );
};