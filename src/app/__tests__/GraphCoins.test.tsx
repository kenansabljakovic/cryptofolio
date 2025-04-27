// src/app/components/__tests__/GraphCoins.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import GraphCoins from '@/app/components/GraphCoins';

// Mock the RTK Query hook(s) used by GraphCoins
jest.mock('@/app/services/api', () => {
  const actual = jest.requireActual('@/app/services/api');
  return {
    ...actual,
    useGetCoinMarketChartQuery: jest.fn(),
  };
});

// Import the mocked hook
import { useGetCoinMarketChartQuery } from '@/app/services/api';

describe('GraphCoins Component', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();
  });

  it('shows loading state correctly', () => {
    // Mock the hook to return loading state
    (useGetCoinMarketChartQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <GraphCoins selectedCoin="bitcoin" />
      </Provider>
    );

    // Check for loading indicators
    const loadingElements = screen.getAllByTestId('graph-loading');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders graph correctly with data', () => {
    // Mock implementation for successful data
    (useGetCoinMarketChartQuery as jest.Mock).mockImplementation(() => ({
      data: {
        prices: [
          [Date.now(), 50000],
          [Date.now() + 3600000, 51000],
        ],
        total_volumes: [
          [Date.now(), 1000000],
          [Date.now() + 3600000, 1200000],
        ],
      },
      isLoading: false,
      error: null,
    }));

    render(
      <Provider store={store}>
        <GraphCoins selectedCoin="bitcoin" />
      </Provider>
    );

    // Check that graph elements are rendered
    expect(screen.getByTestId('graph-container')).toBeInTheDocument();
    // More specific assertions about the graph
  });
});
