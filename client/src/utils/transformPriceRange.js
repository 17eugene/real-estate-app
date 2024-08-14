export function transformPriceRangeToString(min, max) {
  let rangeToString = `$${min} - $${max}`;

  if (!max && !min) return null;

  if ((!min || min === 0) && max > 0) {
    rangeToString = `$0 - $${max}`;
  }
  if ((!max || max === 0) && min > 0) {
    rangeToString = `starting at $${min}`;
  }

  if (min === max) {
    rangeToString = `$${min}`;
  }

  return rangeToString;
}
