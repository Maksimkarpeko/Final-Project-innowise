"use client";

import { CvProjectsSection } from "@/src/features";
import { useCvNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";

type CVProjectsPageProps = {
    userId: string;
    cvId: string;
};

export const CVProjectsPage = ({ userId, cvId }: CVProjectsPageProps) => {
    const navItems = useCvNavItems(userId, cvId);

    return (
        <div className="min-h-screen w-full bg-white text-[#2E2E2E] transition-colors dark:bg-[#303030] dark:text-white/90">
            <NavHeader items={navItems} />

            <div className="w-full px-4 pt-[44px] md:px-8 lg:px-0">
                <CvProjectsSection cvId={cvId} />
            </div>
        </div>
    );
};