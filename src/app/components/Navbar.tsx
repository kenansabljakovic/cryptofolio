import { Inter } from "next/font/google";
import ThemeSwitch from "./ThemeSwitch";
import DropDownCurrencies from "./DropDownCurrencies";
import { CryptofolioLogoIcon } from "../icons/CryptofolioLogoIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { PortfolioGreyIcon } from "../icons/PortfolioGreyIcon";
import { Input } from "../../app/components/ui/input";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export default function Navbar() {
  return (
    <div className="w-full dark:bg-[#13121A] bg-white">
      <nav className="max-w-[1440px] mx-auto py-4 px-6 xl:px-[72px] sm:px-[42px] flex justify-between">
        <div className="flex items-center gap-[10px] text-white font-bold">
          <CryptofolioLogoIcon />
          <span
            className={`${inter.className} dark:text-white text-[#353570] hidden lg:inline md:text-lg lg:text-xl py-2 `}
          >
            Cryptofolio
          </span>
        </div>
        <div className="hidden sm:flex sm:gap-7 lg:gap-14">
          <div className="flex items-center gap-[10px]">
            <div className="bg-[rgb(120,120,250,0.7)] border border-[#7878FA] rounded-md p-1.5 sm:bg-transparent sm:border-none">
              <HomeIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <Link href="/">
              <span className="hidden sm:inline dark:text-white text-[#353570] md:text-sm lg:text-base font-medium">
                Home
              </span>
            </Link>
          </div>
          <div className="dark:bg-[#232336] rounded-md bg-[#CCCCFA] bg-opacity-40 sm:dark:bg-transparent sm:bg-transparent px-3 sm:px-0 flex items-center gap-[10px]">
            <PortfolioGreyIcon />
            <span className="dark:text-white opacity-50 md:text-sm lg:text-base font-medium">
              Portfolio
            </span>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <Input
            className={`${inter.className} w-[36px] h-[36px] sm:w-[130px] sm:h-10 md:h-11 md:w-[200px] lg:w-[286px] lg:h-12 xl:h-12 xl:w-[356px] placeholder-transparent sm:dark:placeholder:text-[#D1D1D1] sm:placeholder:text-[#424286] sm:placeholder:text-opacity-80 sm:placeholder:text-sm sm:placeholder:font-normal pl-12`}
            placeholder="Search..."
          />
          <DropDownCurrencies />
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  );
}
