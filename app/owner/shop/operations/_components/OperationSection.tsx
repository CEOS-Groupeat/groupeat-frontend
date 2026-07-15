// 전체 조립 (page.tsx에서 사용)
'use client';

import { useState } from 'react';
import DefaultButton from '@/components/ui/ButtonDefault';
import AlertIcon from '@/public/icons/icon_alert.svg';
import WeekdayTabs, { type DayOfWeek } from './WeekdayTabs';
import WeekdayNavigator from './WeekdayNavigator';
import OrderAvailableToggle from './OrderAvailableToggle';
import OrderQuantityFields from './OrderQuantityFields';
import TimeRangeField from './TimeRangeField';
import MinOrderDaysField from './MinOrderDaysField';
import PeriodSettingField from './PeriodSettingField';
import { useOperationSchedule } from '../_hooks/useOperationSchedule';
import { useSaveOperationSchedule } from '../_hooks/useSaveOperationSchedule';
import type {
  OperationScheduleData,
  DayScheduleFormFields,
} from '../_types/operation.type';

const ALL_WEEKDAYS: DayOfWeek[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const DEFAULT_DAY_SCHEDULE: DayScheduleFormFields = {
  available: false,
  minOrderQuantity: null,
  maxOrderQuantity: null,
  pickupTimeRange: null,
  breakTimeRange: null,
};

function buildInitialDaysMap(
  dailySchedules: OperationScheduleData['dailySchedules']
): Record<DayOfWeek, DayScheduleFormFields> {
  const map = {} as Record<DayOfWeek, DayScheduleFormFields>;

  ALL_WEEKDAYS.forEach((day) => {
    const existing = dailySchedules?.find((d) => d.dayOfWeek === day);
    map[day] = existing
      ? {
          available: existing.available ?? false,
          minOrderQuantity: existing.minOrderQuantity ?? null,
          maxOrderQuantity: existing.maxOrderQuantity ?? null,
          pickupTimeRange:
            existing.pickupTimeRange?.startTime &&
            existing.pickupTimeRange?.endTime
              ? {
                  startTime: existing.pickupTimeRange.startTime,
                  endTime: existing.pickupTimeRange.endTime,
                }
              : null,
          breakTimeRange:
            existing.breakTimeRange?.startTime &&
            existing.breakTimeRange?.endTime
              ? {
                  startTime: existing.breakTimeRange.startTime,
                  endTime: existing.breakTimeRange.endTime,
                }
              : null,
        }
      : { ...DEFAULT_DAY_SCHEDULE };
  });

  return map;
}

function OperationForm({
  scheduleData,
}: {
  scheduleData: OperationScheduleData;
}) {
  const { mutateAsync: saveSchedule, isPending: isSaving } =
    useSaveOperationSchedule();

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('MONDAY');
  const [minOrderDays, setMinOrderDays] = useState(
    scheduleData.minimumOrderDeadlineDays != null
      ? String(scheduleData.minimumOrderDeadlineDays)
      : ''
  );
  const [daysMap, setDaysMap] = useState(() =>
    buildInitialDaysMap(scheduleData.dailySchedules)
  );

  const availableDays = ALL_WEEKDAYS.filter((day) => daysMap[day].available);
  const currentDay = daysMap[selectedDay];

  const updateCurrentDay = (patch: Partial<DayScheduleFormFields>) => {
    setDaysMap((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], ...patch },
    }));
  };

  const handleSubmit = async () => {
    try {
      const dailySchedules = ALL_WEEKDAYS.map((day) => {
        const d = daysMap[day];

        if (!d.available) {
          // 휴무: available만 명시, 나머지는 다 생략
          return {
            dayOfWeek: day,
            available: false,
          };
        }

        // 주문 가능: 필수 필드들 채워서 전송
        return {
          dayOfWeek: day,
          available: true,
          minOrderQuantity: d.minOrderQuantity ?? undefined,
          maxOrderQuantity: d.maxOrderQuantity ?? undefined,
          pickupTimeRange: d.pickupTimeRange ?? undefined,
          breakTimeRange: d.breakTimeRange ?? undefined,
        };
      });

      await saveSchedule({
        startDate: scheduleData.startDate ?? '',
        endDate: scheduleData.endDate ?? '',
        minimumOrderDeadlineDays: Number(minOrderDays),
        dailySchedules,
      });
      // TODO: 성공 토스트
    } catch (error) {
      console.error('운영 정보 저장 실패:', error);
      // TODO: 에러 토스트
    }
  };

  // scheduleData에서 현재 선택된 요일의 intervalMinutes 찾기
  const currentDayInterval = scheduleData.dailySchedules?.find(
    (d) => d.dayOfWeek === selectedDay
  )?.intervalMinutes;

  return (
    <main className="w-full flex flex-col px-4 items-start">
      <div className="self-stretch flex flex-col items-start gap-2 mt-2 mb-[24px]">
        <PeriodSettingField
          startDate={scheduleData.startDate ?? ''}
          endDate={scheduleData.endDate ?? ''}
          onEditClick={() => {
            // TODO: react-day-picker 기반 캘린더 모달 연결
          }}
        />
        <div className="self-stretch flex items-start gap-1">
          <AlertIcon className="size-4 text-icon-subtlest" />
          <span className="text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
            해당 일정이 적용되는 기간을 설정해주세요
          </span>
        </div>
      </div>

      <MinOrderDaysField value={minOrderDays} onChange={setMinOrderDays} />

      <div className="self-stretch flex flex-col items-start">
        <WeekdayTabs
          selectedDay={selectedDay}
          availableDays={availableDays}
          onSelectDay={setSelectedDay}
        />

        <div className="self-stretch">
          <WeekdayNavigator
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        <div className="self-stretch flex flex-col items-start gap-6">
          <OrderAvailableToggle
            checked={currentDay.available}
            onChange={(available) => updateCurrentDay({ available })}
          />

          <OrderQuantityFields
            minQuantity={String(currentDay.minOrderQuantity)}
            maxQuantity={String(currentDay.maxOrderQuantity)}
            onMinChange={(value) =>
              updateCurrentDay({ minOrderQuantity: Number(value) })
            }
            onMaxChange={(value) =>
              updateCurrentDay({ maxOrderQuantity: Number(value) })
            }
          />

          <div className="self-stretch flex flex-col gap-3">
            <span className="text-text-default text-body font-medium font-['Pretendard']">
              픽업 시간
            </span>
            <TimeRangeField
              label="영업 시간"
              timeRange={currentDay.pickupTimeRange}
              onStartChange={(value) =>
                updateCurrentDay({
                  pickupTimeRange: {
                    startTime: value,
                    endTime: currentDay.pickupTimeRange?.endTime ?? '',
                  },
                })
              }
              onEndChange={(value) =>
                updateCurrentDay({
                  pickupTimeRange: {
                    startTime: currentDay.pickupTimeRange?.startTime ?? '',
                    endTime: value,
                  },
                })
              }
              onAdd={() =>
                updateCurrentDay({
                  pickupTimeRange: { startTime: '10:00', endTime: '19:00' },
                })
              }
              onRemove={() => updateCurrentDay({ pickupTimeRange: null })}
            />
          </div>
          <div className="w-full flex flex-col gap-3 mt-[-14px]">
            <TimeRangeField
              label="휴게 시간"
              timeRange={currentDay.breakTimeRange}
              onStartChange={(value) =>
                updateCurrentDay({
                  breakTimeRange: {
                    startTime: value,
                    endTime: currentDay.breakTimeRange?.endTime ?? '',
                  },
                })
              }
              onEndChange={(value) =>
                updateCurrentDay({
                  breakTimeRange: {
                    startTime: currentDay.breakTimeRange?.startTime ?? '',
                    endTime: value,
                  },
                })
              }
              onAdd={() =>
                updateCurrentDay({
                  breakTimeRange: { startTime: '15:00', endTime: '17:00' },
                })
              }
              onRemove={() => updateCurrentDay({ breakTimeRange: null })}
            />

            <div className="self-stretch flex items-start gap-1 pb-11">
              <AlertIcon className="size-4 text-icon-subtlest" />
              <p className="text-text-subtlest text-caption1 font-normal font-['Pretendard']">
                고객에게 {currentDayInterval ?? 30}분 단위로 노출돼요
              </p>
            </div>
          </div>
        </div>
      </div>

      <DefaultButton onClick={handleSubmit} disabled={isSaving}>
        {isSaving ? '저장 중...' : '저장하기'}
      </DefaultButton>
    </main>
  );
}

export default function OperationSection() {
  const { data: scheduleData, isLoading, isError } = useOperationSchedule();

  if (isLoading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center py-20">
        <span className="text-sm text-text-subtle">로딩 중...</span>
      </div>
    );
  }

  if (isError || !scheduleData) {
    return (
      <div className="w-full flex-1 flex items-center justify-center py-20">
        <span className="text-sm text-text-subtle">
          운영 정보를 불러오지 못했어요.
        </span>
      </div>
    );
  }

  return <OperationForm scheduleData={scheduleData} />;
}
