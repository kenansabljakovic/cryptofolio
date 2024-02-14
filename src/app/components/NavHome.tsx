"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavHome() {
  const pathname = usePathname();

  return (
    <nav className="max-w-[1440px] mx-auto mt-10 xl:px-[72px] lg:px-[36px] md:px-[24px]">
      <div className="w-[495px] flex dark:bg-[#191925] bg-white rounded-md py-1 px-1">
        <Link
          href="/"
          className={`link ${
            pathname === "/"
              ? "bg-[rgb(120,120,250,0.7)] border border-[#7878FA] text-white shadow-md"
              : "dark:bg-[#232336] dark:text-white text-[#424286] border-none"
          } w-[244px] h-[45px] flex items-center justify-center rounded-md text-base font-normal  
                 focus:outline-none`}
        >
          Coins
        </Link>
        <Link
          href="/converter"
          className={`link ${
            pathname === "/converter"
              ? "bg-[rgb(120,120,250,0.7)] border border-[#7878FA] text-white shadow-md"
              : "dark:bg-[#232336] dark:text-white text-[#424286] border-none"
          } w-[244px] h-[45px] flex items-center justify-center rounded-md text-base font-normal  
                 focus:outline-none`}
        >
          Converter
        </Link>
      </div>
    </nav>
  );
}
