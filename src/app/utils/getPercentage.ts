const getPercentage = (volume: number, total: number): number => {
  return Math.floor((volume / total) * 100);
};

export default getPercentage;
