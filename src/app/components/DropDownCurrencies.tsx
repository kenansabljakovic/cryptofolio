'use client';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { ScrollArea } from '../components/ui/scroll-area';
import { updateCurrency } from '../../redux/features/currencySlice';
import { AppDispatch, useAppSelector } from '../../redux/store';

export default function DropDownCurrencies() {
  const [open, setOpen] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();
  const currencies = useAppSelector((state) => state.currency.currencies);
  const currentCurrency = useAppSelector((state) => state.currency.currentCurrency);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-[65px] bg-[#CCCCFA]/40 dark:bg-[#191925] dark:opacity-100 sm:h-10 sm:w-[90px] md:h-11 md:w-[95px] lg:h-12 lg:w-[108px]"
        >
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline sm:rounded-full sm:bg-[#424286] sm:px-[6px] sm:text-white sm:dark:bg-white sm:dark:text-black">
              {currentCurrency.symbol}
            </span>
            <span className="text-sm font-medium uppercase leading-6 text-[#424286] text-opacity-80 dark:text-[#D1D1D1]">
              {currentCurrency.code}
            </span>
          </div>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[108px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No currency found.</CommandEmpty>
          <ScrollArea className="max-h-[100px] overflow-auto">
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
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
