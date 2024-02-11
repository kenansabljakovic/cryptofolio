import { Inter } from "next/font/google";
import { CryptofolioLogoIcon } from "../icons/CryptofolioLogoIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { PortfolioGreyIcon } from "../icons/PortfolioGreyIcon";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import ThemeSwitch from "./ThemeSwitch";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export default function Navbar() {
  return (
    <div className="max-w-[1440px] mx-auto mt-6 mb-[63px] xl:px-[72px] lg:px-[36px] md:px-[24px] flex justify-between">
      <div className="flex items-center gap-[10px] text-white font-bold">
        <CryptofolioLogoIcon />
        <span
          className={`${inter.className} dark:text-white text-[#353570] lg:text-xl md:text-lg py-2`}
        >
          Cryptofolio
        </span>
      </div>
      <div className="flex md:gap-7 lg:gap-14">
        <div className="flex items-center gap-[10px]">
          <HomeIcon />
          <span className="dark:text-white text-[#353570] md:text-sm lg:text-base font-medium">
            Home
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <PortfolioGreyIcon />
          <span className="dark:text-white opacity-50 md:text-sm lg:text-base font-medium">
            Portfolio
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <Input
          className={`${inter.className} lg:h-12 lg:w-[356px] md:h-11 md:w-[215px] dark:placeholder:text-[#D1D1D1] placeholder:text-[#424286] placeholder:text-sm placeholder:font-normal pl-12`}
          placeholder="Search..."
        />
        <div>
          <Select>
            <SelectTrigger className="lg:w-[108px] lg:h-12 md:w-[80px] md:h-11 dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] opacity-40">
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] opacity-40">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ThemeSwitch />
      </div>
    </div>
  );
}
