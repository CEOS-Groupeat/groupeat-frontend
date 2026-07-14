export function extractDistrict(address: string): string {
  const match = address.match(/([가-힣]+구)/);
  return match ? match[1] : '';
}

export function extractNeighborhood(address: string): string {
  const match = address.match(/([가-힣]+동)/);
  return match ? match[1] : '';
}
