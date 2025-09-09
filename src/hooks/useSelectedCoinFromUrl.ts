import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function useSafeSearchParams() {
  try {
    return useSearchParams();
  } catch (e) {
    return new URLSearchParams();
  }
}

export function useSafeRouter() {
  try {
    return useRouter();
  } catch (e) {
    return { push: (url: string) => console.log('Mock router.push:', url) };
  }
}

export function useSafePathname() {
  try {
    return usePathname();
  } catch (e) {
    return '/';
  }
}

export function useSelectedCoinFromUrl() {
  const [selectedCoin, setSelectedCoinState] = useState<string>('bitcoin');
  
  const searchParams = useSafeSearchParams();
  const router = useSafeRouter();
  const pathname = useSafePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const coinFromUrl = searchParams?.get('coin');
      setSelectedCoinState(coinFromUrl || 'bitcoin');
    }
  }, [searchParams]);

  const setSelectedCoin = (newCoin: string) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('coin', newCoin);
      
      const currentCurrency = searchParams?.get('currency');
      if (currentCurrency) {
        params.set('currency', currentCurrency);
      }
      
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return { selectedCoin, setSelectedCoin };
}