import { CoinsIcon } from "../icons/CoinsIcon";
import { ExchangeIcon } from "../icons/ExchangeIcon";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { BitcoinIcon } from "../icons/BitcoinIcon";
import { EthereumIcon } from "../icons/EthereumIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import formatNumber from "@/app/utils/formatNumber";
import getPercentage from "@/app/utils/getPercentage";
import MarketPercentageBar from "./MarketPercentageBar";

async function getMarketData() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=CG-q2aLp44XjWCoV41TwyFeLSnE",
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

export default async function MarketDataHeader() {
  const marketData = await getMarketData();
  const {
    active_cryptocurrencies,
    markets,
    total_market_cap,
    total_volume,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd,
  } = marketData.data;

  const percentageVolumeBasedOnTotalMarketCap = getPercentage(
    total_volume.btc,
    total_market_cap.btc
  );
  const btcMarketCapPercentage: number = Math.floor(market_cap_percentage.btc);
  const ethMarketCapPercentage: number = Math.floor(market_cap_percentage.eth);
  return (
    <div className="dark: bg-[#1E1932] py-4 px-[72px] flex gap-4 justify-center">
      <div className="flex items-center gap-1">
        <CoinsIcon />
        <span className="text-[#D1D1D1] text-xs font-medium">Coins</span>
        <span className="text-xs text-white font-medium">
          {active_cryptocurrencies ? active_cryptocurrencies : ""}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <ExchangeIcon />
        <span className="text-[#D1D1D1] text-xs font-medium">Exchanges</span>
        <span className="text-xs text-white font-medium">{markets}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[#D1D1D1] text-xs font-medium">Market Cap</span>
        <span className="text-xs text-white font-medium">$</span>
        <span className="text-xs text-white font-medium">
          {formatNumber(total_market_cap.usd)}
        </span>
        {market_cap_change_percentage_24h_usd > 0 ? (
          <ChevronUpIcon />
        ) : (
          <ChevronDownIcon />
        )}
        <span
          className={`text-xs font-medium ${
            market_cap_change_percentage_24h_usd > 0
              ? "text-green-700"
              : "text-red-500"
          }`}
        >
          {Math.abs(market_cap_change_percentage_24h_usd).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-white font-medium">$</span>
        <span className="w-full text-xs text-white font-medium">
          {formatNumber(total_volume.usd)}
        </span>
        <MarketPercentageBar
          fill="bg-white"
          percentage={percentageVolumeBasedOnTotalMarketCap}
        />
      </div>
      <div className="flex items-center gap-1">
        <BitcoinIcon />
        <span className="text-xs text-white font-medium">{`${btcMarketCapPercentage}%`}</span>
        <MarketPercentageBar
          fill="bg-[#F7931A]"
          percentage={btcMarketCapPercentage}
        />
      </div>
      <div className="flex items-center gap-1">
        <EthereumIcon />
        <span className="text-xs text-white font-medium">{`${ethMarketCapPercentage}%`}</span>
        <MarketPercentageBar
          fill="bg-[#849DFF]"
          percentage={ethMarketCapPercentage}
        />
      </div>
    </div>
  );
}
