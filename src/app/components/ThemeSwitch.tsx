'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';

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
        className="size-9 sm:size-10 md:size-11 lg:size-12"
      />
    );

  if (resolvedTheme === 'dark') {
    return (
      <button
        onClick={() => setTheme('light')}
        className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-white bg-[#CCCCFA]/40 dark:border-slate-800 dark:bg-[#191925] sm:size-10 md:size-11 lg:size-12"
      >
        <SunIcon className="size-4 sm:size-5 lg:size-6" />
      </button>
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <button
        onClick={() => setTheme('dark')}
        className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-[#CCCCFA]/40 dark:bg-[#191925] sm:size-10 md:size-11 lg:size-12"
      >
        <MoonIcon className="size-4 sm:size-5 lg:size-6" />
      </button>
    );
  }
}
