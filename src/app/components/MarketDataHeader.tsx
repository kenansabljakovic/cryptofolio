import { CoinsIcon } from "../icons/CoinsIcon";
import { ExchangeIcon } from "../icons/ExchangeIcon";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { BitcoinIcon } from "../icons/BitcoinIcon";
import { EthereumIcon } from "../icons/EthereumIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { Progress } from "../components/ui/progress";
import formatNumber from "@/app/utils/formatNumber";
import getPercentage from "@/app/utils/getPercentage";
import MarketPercentageBar from "./MarketPercentageBar";

async function getMarketData() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${process.env.COIN_GECKO_API_KEY}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  return res.json();
}

export default async function MarketDataHeader() {
  const { data } = await getMarketData();
  const {
    active_cryptocurrencies,
    markets,
    total_market_cap,
    total_volume,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd,
  } = data;

  const percentageVolumeBasedOnTotalMarketCap = getPercentage(
    total_volume.btc,
    total_market_cap.btc
  );
  const btcMarketCapPercentage = Math.floor(market_cap_percentage.btc);
  const ethMarketCapPercentage = Math.floor(market_cap_percentage.eth);

  return (
    <div className="w-full mx-auto dark:bg-[#1E1932] bg-[#353570] py-4 lg:px-[72px] flex gap-4 justify-center">
      <div className="flex items-center gap-1">
        <CoinsIcon />
        <span className="text-[#D1D1D1] text-xs font-medium">Coins</span>
        <span className="text-xs text-white font-medium">
          {active_cryptocurrencies}
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
        <span className="text-xs text-white font-medium">
          {formatNumber(total_volume.usd)}
        </span>
        <Progress
          className="w-[53px] h-[6px] bg-gray-500"
          value={percentageVolumeBasedOnTotalMarketCap}
          indicator="bg-white"
        />
      </div>
      <div className="flex items-center gap-1">
        <BitcoinIcon />
        <span className="text-xs text-white font-medium">{`${btcMarketCapPercentage}%`}</span>
        <Progress
          className="w-[53px] h-[6px] bg-gray-500"
          value={btcMarketCapPercentage}
          indicator="bg-[#F7931A]"
        />
      </div>
      <div className="flex items-center gap-1">
        <EthereumIcon />
        <span className="text-xs text-white font-medium">{`${ethMarketCapPercentage}%`}</span>
        <Progress
          className="w-[53px] h-[6px] bg-gray-500"
          value={ethMarketCapPercentage}
          indicator="bg-[#849DFF]"
        />
      </div>
    </div>
  );
}
