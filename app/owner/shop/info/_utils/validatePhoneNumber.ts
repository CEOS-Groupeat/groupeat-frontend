export function isValidPhoneNumber(phoneNumber: string): boolean {
  const digitsOnly = phoneNumber.replace(/-/g, '');
  return /^\d{9,11}$/.test(digitsOnly);
}
