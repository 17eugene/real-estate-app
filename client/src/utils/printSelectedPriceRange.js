export function printSelectedPriceRange(priceRangeObject, filterName) {
  const { minPrice, maxPrice, exactPrice } = priceRangeObject;
  let printedPrice = `$${minPrice}-$${maxPrice}`;

  if (Object.values(priceRangeObject).every((value) => !value))
    printedPrice = filterName;

  if (minPrice && !maxPrice) {
    printedPrice = `Startig at $${minPrice}`;
  } else if (exactPrice) {
    printedPrice = `$${exactPrice}`;
  } else if (!minPrice && maxPrice) {
    printedPrice = `$0-$${maxPrice}`;
  }

  return printedPrice;
}
