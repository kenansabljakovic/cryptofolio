import React from "react";
import { Snippet } from "@nextui-org/react";

const HomepageLinks = ({ link }: { link: string }) => {
  if (!link) return null;

  const formattedLink = link.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <Snippet
      className="dark:bg-[rgb(30,25,50)] bg-white px-0 py-0"
      hideSymbol={true}
    >
      <span className="text-sm sm:text-base font-medium dark:text-white text-[#191932]">
        {formattedLink}
      </span>
    </Snippet>
  );
};

export default HomepageLinks;
