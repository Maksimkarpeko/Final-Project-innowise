"use client";

import { HeaderSearch, useLocale } from "@/src/shared";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { FC, SetStateAction } from "react";

type CvsHeaderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
};

export const CvsHeader: FC<CvsHeaderProps> = ({
                                                isOpen,
                                                setIsOpen,
                                                searchValue,
                                                setSearchValue,
                                              }) => {
  const { t } = useLocale();

  return (
      <div className="flex w-[95%] items-start justify-between bg-transparent pt-0">
        <div className="w-[320px]">
          <HeaderSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
          />
        </div>

        <Button
            type="text"
            icon={<Plus size={22} />}
            className="
          mt-[40px]
          flex!
          h-[40px]!
          items-center!
          gap-3!
          rounded-[40px]!
          border-none!
          bg-transparent!
          px-5!
          font-roboto!
          text-[14px]!
          font-medium!
          uppercase!
          leading-[24.5px]!
          tracking-[0.4px]!
          text-[#D9363E]!
          shadow-none!
          transition-colors!

          hover:bg-[#D9363E]/5!
          hover:text-[#C63031]!

          dark:bg-transparent!
          dark:text-[#D9363E]!
          dark:hover:bg-white/[0.08]!
          dark:hover:text-[#ff5a5f]!
        "
            onClick={() => setIsOpen(!isOpen)}
        >
          {t.cv.list.createButton}
        </Button>
      </div>
  );
};