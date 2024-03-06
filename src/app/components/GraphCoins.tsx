import PriceChart from "./PriceChart";
import VolumeChart from "./VolumeChart";

export default function GraphCoins() {
  return (
    <div className="w-full flex gap-8">
      <PriceChart />
      <VolumeChart />
    </div>
  );
}
