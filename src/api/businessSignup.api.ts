import { components } from "@/src/types/schema";

export type Schemas = components['schemas'];

export type BusinessValidateRequest = Schemas['BusinessValidateRequest'];
export type BusinessValidateResponse = Schemas['ApiResponseBusinessValidateResponse'];

export type BusinessSignupRequest = Schemas['BusinessSignupRequest'];
export type BusinessSignupResponse = Schemas['ApiResponseBusinessSignupResponse'];