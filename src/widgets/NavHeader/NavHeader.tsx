"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "./ui/NavButton";

export type NavHeaderItem = {
    href: string;
    content: string;
};

type NavHeaderProps = {
    items: NavHeaderItem[];
};

export const NavHeader = ({ items }: NavHeaderProps) => {
    const pathname = usePathname();

    return (
        <nav
            className="
        flex
        h-[48px]
        w-full
        items-center
        bg-white
        transition-colors
        dark:bg-[#303030]
      "
        >
            {items.map((item) => (
                <NavButton
                    key={item.href}
                    href={item.href}
                    content={item.content}
                    isActive={pathname === item.href}
                />
            ))}
        </nav>
    );
};