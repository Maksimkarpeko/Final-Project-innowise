"use client";
import { Input } from "antd";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

export const HeaderSearch = () => {
  const path = usePathname()
    .split("")
    .filter((a) => !a.includes("/"))
    .join("");

  return (
    <div className=" ml-5">
      <span className='text-black/60'>{path}</span>
      <div className="pt-3 pb-5 relative">
        <Search className="absolute z-10 top-4.5 left-2" size={"20px"} />
        <Input className="rounded-[40px]! pl-9!" />
      </div>
    </div>
  );
};
