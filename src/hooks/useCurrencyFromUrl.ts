// src/hooks/useCurrencyFromUrl.ts
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define Currency type and the static list of currencies
export type Currency = {
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

// Reusable function to get the currency object from a code
export function getCurrencyObject(code: string | null | undefined): Currency {
  const safeCode = code || 'usd';
  return currencies.find((c) => c.code === safeCode) || currencies[0]; // Fallback to USD
}

// --- Safe Hook Wrappers ---

// Always call hook, return default on error (for tests etc.)
function useSafeSearchParams() {
  try {
    return useSearchParams();
  } catch (e) {
    // console.error('useSearchParams error:', e); // Optional logging
    return new URLSearchParams();
  }
}

export function useSafeRouter() {
  try {
    return useRouter();
  } catch (e) {
    // console.error('useRouter error:', e);
    // Provide a mock router for non-browser environments
    return { push: (url: string) => console.log('Mock router.push:', url) };
  }
}

export function useSafePathname() {
  try {
    return usePathname();
  } catch (e) {
    // console.error('usePathname error:', e);
    // Fallback pathname
    return '/';
  }
}

// --- Main Hook ---

export function useCurrencyFromUrl(): Currency {
  // Start with the default currency state
  const [currency, setCurrency] = useState<Currency>(getCurrencyObject('usd'));
  // Get the raw searchParams hook (only works client-side reliably after mount)
  const searchParams = useSafeSearchParams();

  useEffect(() => {
    // Only run this effect on the client after hydration
    if (typeof window !== 'undefined') {
      const currencyCodeFromUrl = searchParams?.get('currency');
      setCurrency(getCurrencyObject(currencyCodeFromUrl));
    }
    // Re-run if searchParams object instance changes
  }, [searchParams]);

  return currency;
}
