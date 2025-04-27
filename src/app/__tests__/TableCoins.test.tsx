import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import TableCoins from '@/app/components/TableCoins';

// Mock the RTK Query hook
jest.mock('@/app/services/api', () => {
  const actualApi = jest.requireActual('@/app/services/api');
  return {
    ...actualApi,
    __esModule: true,
    ...Object.fromEntries(Object.keys(actualApi).map((key) => [key, actualApi[key]])),
    useGetCoinMarketPaginatedQuery: jest.fn(),
  };
});

// Import the mocked hook
import { useGetCoinMarketPaginatedQuery } from '@/app/services/api';

describe('TableCoins Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('displays loading state correctly', () => {
    // Mock the hook to return loading state
    (useGetCoinMarketPaginatedQuery as jest.Mock).mockImplementation(() => ({
      data: [], // Empty array instead of null to avoid map errors
      isLoading: true,
      error: null,
    }));

    render(
      <Provider store={store}>
        <TableCoins />
      </Provider>
    );

    // Check for loading indicator
    expect(screen.getByRole('status')).toBeInTheDocument(); // assuming your spinner has a role="status"
  });

  it('displays coin data correctly when loaded', () => {
    // Update the mock implementation with complete data structure
    (useGetCoinMarketPaginatedQuery as jest.Mock).mockImplementation(() => ({
      data: [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          image: 'https://example.com/bitcoin.png',
          current_price: 50000,
          price_change_percentage_24h: 2.5,
          price_change_percentage_1h_in_currency: 1.2,
          price_change_percentage_24h_in_currency: 2.5,
          price_change_percentage_7d_in_currency: 5.3,
          market_cap: 1000000000,
          total_volume: 50000000,
          circulating_supply: 19000000,
          total_supply: 21000000,
          sparkline_in_7d: {
            price: [45000, 46000, 47000, 48000, 49000, 50000],
          },
        },
      ],
      isLoading: false,
      error: null,
    }));

    render(
      <Provider store={store}>
        <TableCoins />
      </Provider>
    );

    // Check for coin data
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(
      screen.getByText((content, _element) => {
        return content.includes('50') && content.includes('000');
      })
    ).toBeInTheDocument();
  });

  it('displays error message when API call fails', () => {
    // Update error case mock
    (useGetCoinMarketPaginatedQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: { message: 'API Error' },
    }));

    render(
      <Provider store={store}>
        <TableCoins />
      </Provider>
    );

    // Check for error message
    expect(screen.getByTestId('table-error')).toBeInTheDocument();
  });
});
