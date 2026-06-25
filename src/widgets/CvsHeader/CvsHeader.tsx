import { HeaderSearch } from "@/src/shared";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { FC, SetStateAction, useState } from "react";

type CvsHeaderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const CvsHeader: FC<CvsHeaderProps> = ({ isOpen, setIsOpen }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <>
      <span className="text-black/60 ml-5">CVs</span>
      <div className="flex justify-between w-[95%]">
        <div className="w-[320px]">
          <HeaderSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <Button
          icon={<Plus />}
          className="border-none! text-[16px]! text-red-600! font-medium!"
          onClick={() => setIsOpen(!isOpen)}
        >
          CREATE CV
        </Button>
      </div>
    </>
  );
};
