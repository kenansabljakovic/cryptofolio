const getPercentage = (volume: number, total: number): number => {
  if (!Number.isFinite(volume) || !Number.isFinite(total)) {
    return 0;
  }
  
  if (total === 0) {
    return 0;
  }
  
  return Math.floor((volume / total) * 100);
};

export default getPercentage;
