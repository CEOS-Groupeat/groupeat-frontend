// types/signup.ts
export interface Agreement {
  termsId: number;
  agreed: boolean;
}

export interface BusinessPayload {
  memberId: number | null;
  agreements: Agreement[];
  businessType: 'INDIVIDUAL' | 'CORPORATE' | null;
  representativeName: string;
  businessName: string; // 💡 상호명
  openedDate: string; // 💡 개업연월일 (ex: "2026-05-24")
  businessRegistrationNumber: string; // 💡 사업자등록번호
  businessRegistrationCertificateUrl: string; // 💡 등록증 URL
  email: string;
  age: number | null; // 💡 생년월일이 아니라 나이(age)네요!
  gender: 'MALE' | 'FEMALE' | null;
}