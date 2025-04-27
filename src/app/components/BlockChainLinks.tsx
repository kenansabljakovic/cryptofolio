import React from 'react';
import { Snippet } from '@nextui-org/react';

const BlockchainLinks = ({ link }: { link: string }) => {
  return (
    <Snippet
      className="bg-white px-3 py-1 dark:bg-[rgb(30,25,50)] sm:px-6 sm:py-2"
      hideSymbol={true}
    >
      <span className="text-sm font-medium text-[#191932] dark:text-white sm:text-base">
        {link}
      </span>
    </Snippet>
  );
};

export default BlockchainLinks;
