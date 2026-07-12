export function isValidBirthDate(birthDate: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(birthDate);
}
