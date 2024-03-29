"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { updateCurrency } from "../../redux/features/currencySlice";
import { AppDispatch, useAppSelector } from "../../redux/store";

export default function DropDownCurrencies() {
  const [open, setOpen] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();
  const currencies = useAppSelector((state) => state.currency.currencies);
  const currentCurrency = useAppSelector(
    (state) => state.currency.currentCurrency
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[65px] h-9 sm:w-[90px] sm:h-10 md:w-[95px] md:h-11 lg:w-[108px] lg:h-12 dark:bg-[#191925] dark:opacity-100 bg-[#CCCCFA] bg-opacity-40"
        >
          <div className="flex gap-2 items-center">
            <span className="hidden sm:inline sm:dark:bg-white sm:dark:text-black sm:bg-[#424286] sm:text-white sm:rounded-full sm:px-[6px]">
              {currentCurrency.symbol}
            </span>
            <span className="dark:text-[#D1D1D1] text-[#424286] text-sm font-medium leading-6 text-opacity-80 uppercase">
              {currentCurrency.code}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[108px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No currency found.</CommandEmpty>
          <CommandGroup>
            {currencies.map((currency) => (
              <CommandItem
                key={currency.code}
                onSelect={() => {
                  dispatch(updateCurrency(currency));
                  setOpen(false);
                }}
              >
                {`${currency.symbol} ${currency.code.toUpperCase()}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
