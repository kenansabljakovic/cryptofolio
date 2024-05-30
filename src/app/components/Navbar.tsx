"use client";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useClickAway } from "react-use";
import ThemeSwitch from "./ThemeSwitch";
import DropDownCurrencies from "./DropDownCurrencies";
import { CryptofolioLogoIcon } from "../icons/CryptofolioLogoIcon";
import { Input } from "../../app/components/ui/input";
import StyledNavbarLink from "./StyledNavbarLink";
import SearchResultsListSkeleton from "./SearchResultsListSkeleton";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

type Cryptocurrency = {
  id: string;
  name: string;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: void, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Cryptocurrency[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const fetchCryptocurrencies = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await response.json();
          setSearchResults(data.coins);
        } catch (error) {
          console.error("Error fetching cryptocurrency data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCryptocurrencies();
    } else {
      setSearchResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearch = debounce((searchValue: string) => {
    setSearchQuery(searchValue);
  }, 300);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCoinClick = (coinId: string) => {
    setSearchResults([]);
    setSearchQuery("");
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    router.push(`/coin/${coinId}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        const selectedCoin = searchResults[selectedIndex];
        if (selectedCoin) {
          handleCoinClick(selectedCoin.id);
        }
      }
    }
  };

  useEffect(() => {
    if (
      resultsRef.current &&
      selectedIndex >= 0 &&
      selectedIndex < searchResults.length
    ) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, searchResults.length]);

  useClickAway(dropdownRef, () => {
    setSearchResults([]);
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  });

  return (
    <div className="w-full dark:bg-[#13121A] bg-white">
      <nav className="max-w-[1440px] mx-auto py-4 px-6 xl:px-[72px] sm:px-[42px] flex justify-between">
        <div className="flex items-center gap-[10px] text-white font-bold">
          <Link href="/">
            <CryptofolioLogoIcon />
          </Link>
          <Link href="/">
            <span
              className={`${inter.className} dark:text-white text-[#353570] hidden lg:inline md:text-lg lg:text-xl py-2 `}
            >
              Cryptofolio
            </span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:gap-7 lg:gap-14">
          <div className="flex items-center gap-[10px]">
            <div className="bg-[rgb(120,120,250,0.7)] border border-[#7878FA] rounded-md p-1.5 sm:bg-transparent sm:border-none">
              <StyledNavbarLink href="/" icon="home">
                Home
              </StyledNavbarLink>
            </div>
          </div>
          <div className="dark:bg-[#232336] rounded-md bg-[#CCCCFA] bg-opacity-40 sm:dark:bg-transparent sm:bg-transparent px-3 sm:px-0 flex items-center gap-[10px]">
            <StyledNavbarLink href="/portfolio" icon="portfolio">
              Portfolio
            </StyledNavbarLink>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <form onSubmit={handleSubmit} className="group">
            <Input
              ref={inputRef}
              className={`${
                inter.className
              } transition-all sm:transition-none duration-300 ease-in-out ${
                searchResults.length > 0 ? "rounded-b-none" : "rounded-b-md"
              } w-[36px] h-[36px] sm:w-[130px] sm:h-10 md:h-11 md:w-[200px] lg:w-[286px] lg:h-12 xl:h-12 xl:w-[356px] focus:w-[149px] sm:focus:w-[130px] md:focus:w-[200px] lg:focus:w-[286px] xl:focus:w-[356px] placeholder-transparent sm:dark:placeholder:text-[#D1D1D1] sm:placeholder:text-[#424286] sm:placeholder:text-opacity-80 sm:placeholder:text-sm sm:placeholder:font-normal pl-12 text-base sm:text-sm`}
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute bg-white dark:bg-[#191925] w-[149px] sm:w-[130px] md:w-[200px] lg:w-[286px] xl:w-[356px] border-l border-b border-r border-white border-opacity-10 rounded-b-md py-2 px-2 z-10"
              >
                {isLoading ? (
                  <SearchResultsListSkeleton />
                ) : (
                  <ul ref={resultsRef}>
                    {searchResults
                      .map((coin, index) => (
                        <li
                          key={coin.id}
                          className={`py-2 ${
                            index === selectedIndex
                              ? "bg-gray-200 dark:bg-gray-600 rounded-md"
                              : ""
                          }`}
                        >
                          <Link
                            href={`/coin/${coin.id}`}
                            className="flex items-center gap-4"
                            onClick={() => handleCoinClick(coin.id)}
                          >
                            <span
                              className={`${inter.className} text-sm leading-[22px] pl-2`}
                            >
                              {coin.name}
                            </span>
                          </Link>
                        </li>
                      ))
                      .slice(0, 10)}
                  </ul>
                )}
              </div>
            )}
          </form>
          <DropDownCurrencies />
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  );
}
