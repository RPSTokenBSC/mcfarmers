export function semiShortenAddress(address: string) {
  const firstPart = address.slice(0, 2);
  const secondPart = address.slice(address.length - 12, address.length);
  return [firstPart, secondPart].join("...");
}
