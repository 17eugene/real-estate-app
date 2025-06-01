export function transformPriceRangeQueryStr(priceRangeData) {
  let range = {
    minPrice: null || priceRangeData?.minimum,
    maxPrice: null || priceRangeData?.maximum,
    exactPrice: null,
  };

  if (priceRangeData?.minimum > priceRangeData?.maximum) {
    range.maxPrice = null;
  } else if (
    priceRangeData?.minimum === priceRangeData?.maximum &&
    priceRangeData?.minimum > 0
  ) {
    range.exactPrice = priceRangeData?.minimum;
    range.minPrice = null;
    range.maxPrice = null;
  } else if (priceRangeData?.minimum === 0 && priceRangeData?.maximum === 0) {
    range.minPrice = null;
    range.maxPrice = null;
  } else if (priceRangeData?.minimum === 0 && priceRangeData?.maximum > 0) {
    range.minPrice = null;
  }

  return range;
}
