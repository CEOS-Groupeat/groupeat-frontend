export function isValidMobilePhoneNumber(phoneNumber: string): boolean {
  return /^01[016789]\d{7,8}$/.test(phoneNumber);
}
