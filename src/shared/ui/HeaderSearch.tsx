"use client";
import { Input } from "antd";
import clsx from "clsx";
import { Search } from "lucide-react";
import { FC } from "react";

import { useLocale } from "../i18n";

type HeaderSearchProps = {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  className?: string;
};

export const HeaderSearch: FC<HeaderSearchProps> = ({
  searchValue,
  setSearchValue,
  className,
}) => {
  const { t } = useLocale();

  return (
    <div className="ml-5">
      <div className="pt-3 pb-5 relative">
        <Search className="absolute z-10 top-4.5 left-2" size={"20px"} />
        <Input
          className={clsx("rounded-[40px]! pl-9!", className)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t.common.search}
        />
      </div>
    </div>
  );
};
