// jest.setup.js

// Mock MarketDataHeader (used in layout)
jest.mock('@/app/components/MarketDataHeader', () => ({
  __esModule: true, // Needed for mocking default exports
  default: () => <div data-testid="market-data-header-mock">MarketDataHeader</div>,
}));

// Mock MarketDataHeaderSkeleton (potentially rendered by MarketDataHeader)
jest.mock('@/app/components/MarketDataHeaderSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="market-data-header-skeleton-mock">MarketDataHeaderSkeleton</div>,
}));

import '@testing-library/jest-dom'; // Import Jest DOM matchers
import 'cross-fetch/polyfill'; // Add this line

// Add ResizeObserver mock
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Mock the entire API service globally
jest.mock('@/app/services/api', () => {
  // Default mock implementation for RTK Query hooks
  const createMockHook = () => jest.fn().mockReturnValue({
    data: undefined,
    isLoading: true, // Default to loading state
    isFetching: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  return {
    __esModule: true, // Ensure proper module mocking
    cryptoApi: {
      reducerPath: 'cryptoApi',
      reducer: (state = {}) => state, // Dummy reducer
      middleware: (store) => (next) => (action) => next(action), // Dummy middleware
      // Provide mock functions for hooks so they exist,
      // individual tests can override these with specific implementations
      useGetGlobalDataQuery: createMockHook(),
      useGetCoinMarketsQuery: createMockHook(),
      useGetCoinMarketChartQuery: createMockHook(),
      useGetCoinDetailsQuery: createMockHook(),
      useGetCoinMarketPaginatedQuery: createMockHook(),
      useGetCoinPageInfoQuery: createMockHook(),
    },
    // Export the hooks directly with default return values
    useGetGlobalDataQuery: createMockHook(),
    useGetCoinMarketsQuery: createMockHook(),
    useGetCoinMarketChartQuery: createMockHook(),
    useGetCoinDetailsQuery: createMockHook(),
    useGetCoinMarketPaginatedQuery: createMockHook(),
    useGetCoinPageInfoQuery: createMockHook(),
  };
});

// Global mocks - these apply before any test file runs
