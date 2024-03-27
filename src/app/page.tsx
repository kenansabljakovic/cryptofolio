import NavHome from "./components/NavHome";
import CarouselCoins from "./components/CarouselCoins";
import GraphCoins from "./components/GraphCoins";
import Timeline from "./components/Timeline";
import TableCoins from "./components/TableCoins";

export default function Home() {
  return (
    <main className="pb-10">
      <NavHome />
      <div className="mt-5 sm:mt-[70px] max-w-[1440px] mx-auto px-6 xl:px-[72px] sm:px-[42px]">
        <CarouselCoins />
      </div>
      <div className="mt-4 sm:mt-10 max-w-[1440px] mx-auto px-6 xl:px-[72px] sm:px-[42px]">
        <GraphCoins />
      </div>
      <div className="mt-4 sm:mt-10 max-w-[1440px] mx-auto px-6 xl:px-[72px] sm:px-[42px]">
        <Timeline />
      </div>
      <div className="mt-10 max-w-[1440px] mx-auto px-6 xl:px-[72px] sm:px-[42px]">
        <TableCoins />
      </div>
    </main>
  );
}
