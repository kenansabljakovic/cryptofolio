import StyledHomePageLink from "./StyledHomePageLink";

export default function NavHome() {
  return (
    <nav className="max-w-[1440px] mx-auto mt-10 xl:px-[72px] lg:px-[36px] md:px-[24px]">
      <div className="w-[495px] flex dark:bg-[#191925] bg-white rounded-md py-1 px-1">
        <StyledHomePageLink href="/">Coins</StyledHomePageLink>
        <StyledHomePageLink href="/converter">Converter</StyledHomePageLink>
      </div>
    </nav>
  );
}
