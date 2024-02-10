"use client";

import { FiSun, FiMoon } from "react-icons/fi";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={48}
        height={48}
        sizes="48x48"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  if (resolvedTheme === "dark") {
    return (
      <div
        onClick={() => setTheme("light")}
        className="dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] opacity-40 dark:border-slate-800 w-12 h-12 flex items-center justify-center border border-white rounded-xl cursor-pointer"
      >
        <FiSun />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div
        onClick={() => setTheme("dark")}
        className="dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] opacity-40 w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer"
      >
        <FiMoon />
      </div>
    );
  }
}
