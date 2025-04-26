import React from 'react';

type PortfolioProps = {
  children: React.ReactNode;
};

export default function PortfolioLayout({ children }: PortfolioProps) {
  return <>{children}</>;
}
