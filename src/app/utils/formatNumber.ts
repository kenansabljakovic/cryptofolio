const formatNumber = (number: number) => {
  let unit = "";
  let formattedNumber = 0;

  if (number < 1e3) {
    unit = "";
    formattedNumber = number;
  } else if (number < 1e6) {
    unit = "K";
    formattedNumber = number / 1e3;
  } else if (number < 1e9) {
    unit = "M";
    formattedNumber = number / 1e6;
  } else if (number < 1e12) {
    unit = "B";
    formattedNumber = number / 1e9;
  } else if (number < 1e15) {
    unit = "T";
    formattedNumber = number / 1e12;
  } else if (number < 1e18) {
    unit = "Q";
    formattedNumber = number / 1e15;
  } //

  return formattedNumber.toFixed(2) + " " + unit;
};

export default formatNumber;
