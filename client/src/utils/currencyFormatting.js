export function currencyFormatting(number) {
  if (!number) return;
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
