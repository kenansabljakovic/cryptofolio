//https://api.coingecko.com/api/v3/global
import { CoinsIcon } from "../../icons/CoinsIcon";
import { ExchangeIcon } from "../../icons/ExchangeIcon";
import { CaretIcon } from "../../icons/CaretIcon";
import formatNumber from "@/app/utils/formatNumber";

const getPercentage = (value: number, total: number): number => {
  return Math.floor((value / total) * 100);
};

async function getMarketData() {
  const res = await fetch("https://api.coingecko.com/api/v3/global", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

export default async function NavbarInfo() {
  const marketData = await getMarketData();
  //const arr = Object.entries(marketData);
  console.log(marketData);
  const {
    active_cryptocurrencies,
    markets,
    total_market_cap,
    total_volume,
    market_cap_percentage,
  } = marketData.data;
  //const sumOfTotalMarketCap = Object.values(total_market_cap).reduce((acc, curr) => acc + parseFloat(curr), 0);
  //const sumOfTotalVolume = Object.values(total_volume).reduce((acc, curr) => acc + parseFloat(curr), 0);
  //console.log("sum: ",sumOfTotalMarketCap)
  const totalMarketCapUSD = total_market_cap.usd;
  const formattedMarketCap = (totalMarketCapUSD / 1e12).toFixed(2);
  const btcMarketCapPercentage: number = Math.floor(market_cap_percentage.btc);
  const ethMarketCapPercentage: number = Math.floor(market_cap_percentage.eth);
  return (
    <div className="flex gap-4 justify-center">
      <div className="flex items-center gap-1">
        <CoinsIcon />
        <span className="text-[#D1D1D1] text-xs font-medium">Coins</span>
        <span className="text-xs text-white font-medium">
          {active_cryptocurrencies}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <ExchangeIcon />
        <span className="text-[#D1D1D1] text-xs font-medium">Exchange</span>
        <span className="text-xs text-white font-medium">{markets}</span>
      </div>
      <div className="flex items-center gap-1">
        <CaretIcon />
        <span className="text-xs text-white font-medium">
          {formatNumber(total_market_cap.usd)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-white font-medium">$</span>
        <span className="text-xs text-white font-medium">
          {formatNumber(total_volume.usd)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-white font-medium">{`${btcMarketCapPercentage}%`}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-white font-medium">{`${ethMarketCapPercentage}%`}</span>
      </div>
    </div>
  );
}
