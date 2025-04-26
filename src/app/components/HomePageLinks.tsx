import React from 'react';
import { Snippet } from '@nextui-org/react';

const HomepageLinks = ({ link }: { link: string }) => {
  const formattedLink = link.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <Snippet className="bg-white p-0 dark:bg-[rgb(30,25,50)]" hideSymbol={true}>
      <span className="text-sm font-medium text-[#191932] dark:text-white sm:text-base">
        {formattedLink}
      </span>
    </Snippet>
  );
};

export default HomepageLinks;
