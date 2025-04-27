import * as React from 'react';

import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <SearchIcon className="absolute left-[14px] top-[7px] size-[20px] text-[#424286] text-opacity-80 dark:text-[#D1D1D1] sm:top-[10px] md:top-[13px] lg:top-[14px]" />
        <input
          type={type}
          className={cn(
            'flex rounded-md border bg-[#CCCCFA] bg-opacity-40 text-sm focus-visible:outline-none disabled:cursor-not-allowed dark:border-slate-800 dark:bg-[#191925]',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
