import React, { Suspense } from 'react';
import NavHome from '../components/NavHome';

type ConverterLayoutProps = {
  children: React.ReactNode;
};

export default function ConverterLayout({ children }: ConverterLayoutProps) {
  return (
    <>
      <Suspense fallback={null}>
        <NavHome />
      </Suspense>
      {children}
    </>
  );
}
