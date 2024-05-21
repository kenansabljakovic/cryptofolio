"use client";

import { FiSun, FiMoon } from "react-icons/fi";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+"
        width={48}
        height={48}
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12"
      />
    );

  if (resolvedTheme === "dark") {
    return (
      <button
        onClick={() => setTheme("light")}
        className="dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] bg-opacity-40 dark:border-slate-800 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center border border-white rounded-md cursor-pointer"
      >
        <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button
        onClick={() => setTheme("dark")}
        className="dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] opacity-40 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-md cursor-pointer"
      >
        <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </button>
    );
  }
}
