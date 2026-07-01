import Link from "next/link";

type NavButtonProps = {
    href: string;
    content: string;
    isActive?: boolean;
};

export const NavButton = ({
                              href,
                              content,
                              isActive = false,
                          }: NavButtonProps) => {
    return (
        <Link
            href={href}
            className="
        relative
        flex
        h-[48px]
        min-w-[112px]
        flex-1
        items-center
        justify-center
        px-3
        text-[12px]
        leading-[17.5px]
        tracking-[0.4px]
        uppercase
        transition-colors

        sm:w-[150px]
        sm:min-w-[150px]
        sm:flex-none
        sm:px-0
        sm:text-[14px]
      "
        >
      <span
          className={
              isActive
                  ? "font-semibold text-[#C63031]"
                  : "font-medium text-[#2E2E2E] transition-colors dark:text-white/60"
          }
      >
        {content}
      </span>

            {isActive && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C63031] sm:w-[150px]" />
            )}
        </Link>
    );
};