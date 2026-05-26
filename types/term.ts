// 1. API 응답 스펙에 맞춘 타입 정의
interface Term {
  termsId: number;
  title: string;
  content: string;
  required: boolean;
  targetType: string;
  version: string;
}