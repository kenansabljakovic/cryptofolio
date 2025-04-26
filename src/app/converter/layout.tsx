import React from 'react';
import NavHome from '../components/NavHome';

type ConverterLayoutProps = {
  children: React.ReactNode;
};

export default function ConverterLayout({ children }: ConverterLayoutProps) {
  return (
    <>
      <NavHome />
      {children}
    </>
  );
}
