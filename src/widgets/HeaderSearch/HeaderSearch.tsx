"use client";
import { Input } from "antd";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC } from "react";

type HeaderSearchProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
};

export const HeaderSearch: FC<HeaderSearchProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const path = usePathname()
    .split("")
    .filter((a) => !a.includes("/"))
    .join("");

  return (
    <div className=" ml-5">
      <span className="text-black/60">{path}</span>
      <div className="pt-3 pb-5 relative">
        <Search className="absolute z-10 top-4.5 left-2" size={"20px"} />
        <Input
          className="rounded-[40px]! pl-9!"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};
