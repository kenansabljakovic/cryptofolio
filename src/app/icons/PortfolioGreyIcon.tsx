/*
export const PortfolioGreyIcon = () => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path
        d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "white", strokeOpacity: 0.5 }}
      />
    </svg>
  );
};
*/
export const PortfolioGreyIcon = () => {
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <svg
        viewBox="0 0 25 24"
        fill="none"
        className="stroke-current dark:text-white opacity-50"
      >
        <path
          d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
