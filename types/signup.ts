// types/signup.ts
export interface Agreement {
  termsId: number;
  agreed: boolean;
}

export interface BusinessPayload {
  memberId: number | null;
  agreements: Agreement[];
  businessType: 'INDIVIDUAL' | 'CORPORATION' | null;
  representativeName: string;
  businessName: string; // 상호명
  openedDate: string; // 개업연월일
  businessRegistrationNumber: string; // 사업자등록번호
  businessValidationToken: string; // 사업자등록번호 발급 토큰
  businessRegistrationCertificateUrl: string; // 등록증 URL
  email: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE' | null;
}
