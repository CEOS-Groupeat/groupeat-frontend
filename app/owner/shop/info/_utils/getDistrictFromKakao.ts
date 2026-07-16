export async function getDistrictFromKakao(address: string) {
  const res = await fetch(`/api/kakao/address?address=${encodeURIComponent(address)}`);
  if (!res.ok) {
    return { district: '', neighborhood: '' };
  }
  return res.json();
}