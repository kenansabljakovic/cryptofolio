// src/app/__tests__/page.test.tsx
/* eslint-disable react/display-name */ // Disable display-name rule for this file
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../page'; // Import the home page component
import { Provider } from 'react-redux'; // Import Provider
import { store } from '@/redux/store'; // Import store

// Mock child components directly used by Page.tsx
// MarketDataHeader and its skeleton are mocked globally in jest.setup.js
jest.mock('@/app/components/GraphCoins', () => () => (
  <div data-testid="graph-coins-mock">GraphCoins</div>
));
jest.mock('@/app/components/TableCoins', () => () => (
  <div data-testid="table-coins-mock">TableCoins</div>
));

// Basic test suite for the Home Page
describe('Home Page', () => {
  it('renders the main components', () => {
    // Render the Page component wrapped in Redux Provider
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    // We'll skip checking for MarketDataHeader/Skeleton since they're rendered by layout
    // and focus only on components directly rendered by Page
    expect(screen.getByTestId('graph-coins-mock')).toBeInTheDocument();
    expect(screen.getByTestId('table-coins-mock')).toBeInTheDocument();
  });
});
