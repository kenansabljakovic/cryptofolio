'use client';

import * as React from 'react';
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
import { useCurrencyFromUrl, useSafeRouter, useSafePathname } from '@/hooks/useCurrencyFromUrl';

// Define Currency type and the static list of currencies
type Currency = {
  symbol: string;
  code: string;
};

const currencies: Currency[] = [
  { symbol: '$', code: 'usd' },
  { symbol: '€', code: 'eur' },
  { symbol: '£', code: 'gbp' },
  { symbol: 'C$', code: 'cad' },
  { symbol: '₣', code: 'chf' },
  { symbol: 'A$', code: 'aud' },
  { symbol: '₹', code: 'inr' },
  { symbol: '¥', code: 'jpy' },
  { symbol: 'zł', code: 'pln' },
  { symbol: '₿', code: 'btc' },
  { symbol: 'Ξ', code: 'eth' },
  { symbol: 'Ł', code: 'ltc' },
];

export default function DropDownCurrencies() {
  const [open, setOpen] = React.useState(false);

  // Use safe navigation hooks
  const router = useSafeRouter();
  const pathname = useSafePathname();

  // Use the custom hook to get currency data from URL
  const currentCurrency = useCurrencyFromUrl();

  const onSelect = (currency: Currency) => {
    // Use safe hooks
    const searchParamsForURL =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    const current = new URLSearchParams(Array.from(searchParamsForURL.entries()));
    current.set('currency', currency.code);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
    setOpen(false);
  };

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
                <CommandItem key={currency.code} onSelect={() => onSelect(currency)}>
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
