import type { GetResponse, PutRequest, PutResponse } from '@/src/types/api';

export type OperationScheduleResponse =
  GetResponse<'/api/owner/store/order-schedule'>;
export type OperationScheduleData = NonNullable<
  OperationScheduleResponse['data']
>;
export type DailySchedule = NonNullable<
  OperationScheduleData['dailySchedules']
>[number];
export type TimeRange = NonNullable<DailySchedule['pickupTimeRange']>;

export type SaveOperationScheduleRequest =
  PutRequest<'/api/owner/store/order-schedule'>;
export type SaveOperationScheduleResponse =
  PutResponse<'/api/owner/store/order-schedule'>;

export interface TimeRangeFields {
  startTime: string;
  endTime: string;
}

export interface DayScheduleFormFields {
  available: boolean;
  minOrderQuantity: number | null;
  maxOrderQuantity: number | null;
  pickupTimeRange: TimeRangeFields | null;
  breakTimeRange: TimeRangeFields | null;
}
