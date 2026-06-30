"use client";

import { FC } from "react";

import { CVPreviewInfo } from "@/src/features";
import { useCvNavItems } from "@/src/shared";
import { NavHeader } from "@/src/widgets";

type CVPreviewProps = {
    userId: string;
    cvId: string;
};

export const CVPreview: FC<CVPreviewProps> = ({ cvId, userId }) => {
    const navItems = useCvNavItems(userId, cvId);

    return (
        <div className="min-h-screen w-full bg-white text-[#2E2E2E] transition-colors dark:bg-[#303030] dark:text-white/90">
            <NavHeader items={navItems} />
            <CVPreviewInfo cvId={cvId} />
        </div>
    );
};