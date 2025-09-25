const OPACITY_MAP = {
  5: "0D",
  10: "1A",
  20: "33",
  30: "4D",
  40: "66",
  50: "80",
  60: "99",
  70: "B3",
  80: "CC",
  90: "E6",
  100: "FF",
};

export const lightenColor = (color, opacity) => {
  // Get opacity hex value
  const opacityHex = OPACITY_MAP[opacity];

  // Return color with opacity
  return `${color}${opacityHex}`;
};
