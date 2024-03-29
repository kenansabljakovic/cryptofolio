import StyledHomePageLink from "./StyledHomePageLink";

export default function NavHome() {
  return (
    <nav className="hidden sm:block max-w-[1440px] mx-auto mt-5 sm:mt-10 px-6 xl:px-[72px] sm:px-[42px]">
      <div className="w-[343px] lg:w-[400px] xl:w-[495px] flex dark:bg-[#191925] bg-white rounded-md py-1 px-1">
        <StyledHomePageLink href="/">Coins</StyledHomePageLink>
        <StyledHomePageLink href="/converter">Converter</StyledHomePageLink>
      </div>
    </nav>
  );
}
