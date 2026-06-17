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
                w-[150px]
                items-center
                justify-center
                text-[14px]
                leading-[17.5px]
                tracking-[0.4px]
                uppercase
                transition-colors
              "
    >
      <span
        className={
          isActive
            ? "font-semibold text-[#C63031]"
            : "font-medium text-[#2E2E2E]"
        }
      >
        {content}
      </span>
      {isActive && (
        <span className="absolute bottom-0 left-0 h-[2px] w-[150px] bg-[#C63031]" />
      )}
    </Link>
  );
};
