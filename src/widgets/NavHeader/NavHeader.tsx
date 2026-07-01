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
        overflow-x-auto
        bg-white
        transition-colors

        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden

        dark:bg-[#303030]
        sm:overflow-visible
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