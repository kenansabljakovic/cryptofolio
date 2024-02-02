function formatNumber(number: number) {
  let unit = "";
  let formattedNumber = 0;

  if (number < 1e3) {
    unit = ""; // No unit for numbers less than 1 thousand
    formattedNumber = number;
  } else if (number < 1e6) {
    unit = "K"; // Thousands
    formattedNumber = number / 1e3;
  } else if (number < 1e9) {
    unit = "M"; // Millions
    formattedNumber = number / 1e6;
  } else if (number < 1e12) {
    unit = "B"; // Billions
    formattedNumber = number / 1e9;
  } else if (number < 1e15) {
    unit = "T"; // Trillions
    formattedNumber = number / 1e12;
  } else if (number < 1e18) {
    unit = "Q"; // Quadrillions
    formattedNumber = number / 1e15;
  } // Add more else if blocks for larger units if necessary

  return formattedNumber.toFixed(2) + " " + unit;
}

export default formatNumber;
