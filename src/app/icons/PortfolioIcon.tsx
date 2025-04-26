export const PortfolioIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={`flex size-6 items-center justify-center ${!isActive && 'opacity-50'}`}>
      <svg viewBox="0 0 25 24" fill="none" className="stroke-current dark:text-white">
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
