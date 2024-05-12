import React from "react";
import { Snippet } from "@nextui-org/react";

const BlockchainLinks = ({ link }: { link: string }) => {
  if (!link) return null;

  return (
    <Snippet
      className="dark:bg-[rgb(30,25,50)] bg-white px-3 py-1 sm:px-6 sm:py-2"
      hideSymbol={true}
    >
      <span className="text-sm sm:text-base font-medium dark:text-white text-[#191932]">
        {link}
      </span>
    </Snippet>
  );
};

export default BlockchainLinks;
