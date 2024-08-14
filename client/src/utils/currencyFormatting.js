export function currencyFormatting(number) {
  return new Intl.NumberFormat("en-EN", { style: "currency", currency: "USD" }).format(
    number
  );
}
