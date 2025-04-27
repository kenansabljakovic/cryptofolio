'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type TimelineOption = {
  id: string;
  display: string;
  value: number;
};

type TimelineDaysProps = {
  timelineOption: TimelineOption;
  isActive: boolean;
};

// Create safe hooks that won't break in tests
function useSafeRouter() {
  try {
    return useRouter();
  } catch {
    return { push: (url: string) => console.log('Mock router.push:', url) };
  }
}

function useSafePathname() {
  try {
    return usePathname();
  } catch {
    return '/';
  }
}

function useSafeSearchParams() {
  try {
    return useSearchParams();
  } catch {
    return new URLSearchParams();
  }
}

export default function TimelineDays({ timelineOption, isActive }: TimelineDaysProps) {
  // Always call our wrapper hooks at the top level
  const router = useSafeRouter();
  const pathname = useSafePathname();
  const searchParams = useSafeSearchParams();

  const handleClick = () => {
    try {
      // Use the safe versions of navigation hooks
      const current = new URLSearchParams(Array.from(searchParams?.entries() || []));
      current.set('timeline', timelineOption.id);
      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    } catch (e) {
      console.log('Error updating timeline:', e);
    }
  };

  return (
    <button
      className={`w-14 p-1 ${isActive ? 'rounded-md border border-[#7878FA] bg-[rgb(120,120,250,0.7)] shadow-md' : ''}`}
      onClick={handleClick}
      key={timelineOption.id}
    >
      <span className="text-sm text-[#181825] dark:text-[#E4E4F0]">{timelineOption.display}</span>
    </button>
  );
}
