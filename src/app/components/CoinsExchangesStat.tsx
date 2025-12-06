interface CoinsExchangesStatProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const CoinsExchangesStat = React.memo(function CoinsExchangesStat({
  icon,
  label,
  value,
}: CoinsExchangesStatProps) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="text-xs font-medium text-[#D1D1D1]">{label}</span>
      <span className="text-xs font-medium text-white">{value}</span>
    </div>
  );
});

CoinsExchangesStat.displayName = 'CoinsExchangesStat';

export default CoinsExchangesStat;
