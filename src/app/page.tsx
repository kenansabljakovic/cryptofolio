export default function Home() {
  return (
    <main className="max-w-[1440px] mx-auto mt-10 lg:px-[72px]">
      <nav className="">
        <div className="w-[495px] flex dark:bg-[#191925] bg-white rounded-md py-1 px-1">
          <button
            className="w-[244px] h-[45px] bg-[rgb(120,120,250,0.7)] border border-[#7878FA] 
                 text-white px-6 py-2 rounded-md text-base font-normal shadow-md 
                 focus:outline-none"
            style={{
              boxShadow: "4px 4px 20px 8px rgba(120, 120, 250, 0.15)",
            }}
          >
            Coins
          </button>
          <button className="w-[244px] h-[45px] dark:bg-[#232336] dark:text-white text-[#424286] rounded-md text-base font-normal focus:outline-none">
            Converter
          </button>
        </div>
      </nav>
    </main>
  );
}
