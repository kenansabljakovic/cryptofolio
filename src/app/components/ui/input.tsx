import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <SearchIcon className="absolute top-[7px] left-[14px] sm:top-[10px] md:top-[13px] lg:top-[14px] h-[20px] w-[20px] dark:text-[#D1D1D1] text-[#424286] text-opacity-80" />
        <input
          type={type}
          className={cn(
            "flex rounded-md border dark:bg-[#191925] bg-[#CCCCFA] bg-opacity-40  text-sm focus-visible:outline-none disabled:cursor-not-allowed  dark:border-slate-800",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
