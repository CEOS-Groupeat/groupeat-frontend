// 전체 조립 (page.tsx에서 사용)
'use client';

import { useState, useRef, useEffect } from 'react';
import DefaultButton from '@/components/ui/ButtonDefault';
import AlertIcon from '@/public/icons/icon_alert.svg';
import SuccessToast from '@/components/ui/SuccessToast';
import ToastError from '@/components/ui/ToastError';
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

const WEEKDAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: '월요일',
  TUESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  SATURDAY: '토요일',
  SUNDAY: '일요일',
};

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

  const [periodDates, setPeriodDates] = useState({
    startDate: scheduleData.startDate ?? '',
    endDate: scheduleData.endDate ?? '',
  });

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (message: string) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(message);
    setShowErrorToast(true);
    errorTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
      errorTimerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const availableDays = ALL_WEEKDAYS.filter((day) => daysMap[day].available);
  const currentDay = daysMap[selectedDay];

  const updateCurrentDay = (patch: Partial<DayScheduleFormFields>) => {
    setDaysMap((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], ...patch },
    }));
  };

  // 1단계: 영업 설정(기간) 확인
  const guardPeriod = (): boolean => {
    if (!periodDates.startDate || !periodDates.endDate) {
      showError('영업 설정을 먼저 진행해주세요.');
      return false;
    }
    return true;
  };

  // 2단계: 최소 주문 기한 확인 (기간이 먼저 설정되어 있어야 함)
  const guardMinOrderDays = (): boolean => {
    if (!guardPeriod()) return false;
    return true;
  };

  // 3단계: 요일별 탭/토글 확인 (기간 + 최소기한 필요)
  const guardWeekday = (): boolean => {
    if (!guardPeriod()) return false;
    if (!minOrderDays.trim()) {
      showError('최소 주문 가능 기한을 설정해주세요.');
      return false;
    }
    return true;
  };

  // 4단계: 요일 세부(수량/픽업시간) 확인 (기간 + 최소기한 + available 필요)
  const guardDayDetail = (): boolean => {
    if (!guardWeekday()) return false;
    if (!currentDay.available) {
      showError('요일별 주문 관리를 등록해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!periodDates.startDate || !periodDates.endDate) {
      showError('영업 설정을 먼저 진행해주세요.');
      return;
    }

    // 1단계: 운영 기간 순서 검증
    if (new Date(periodDates.startDate) > new Date(periodDates.endDate)) {
      showError('운영 시작일은 종료일보다 이전이어야 해요.');
      return;
    }

    if (!minOrderDays.trim()) {
      showError('최소 주문 가능 기한을 설정해주세요.');
      return;
    }

    const hasAvailableDay = ALL_WEEKDAYS.some((day) => daysMap[day].available);
    if (!hasAvailableDay) {
      showError('요일별 주문 관리를 등록해주세요.');
      return;
    }

    // 3~5단계: 영업일로 설정된 각 요일의 세부값 검증
    for (const day of ALL_WEEKDAYS) {
      const d = daysMap[day];
      if (!d.available) continue;

      if (d.minOrderQuantity == null || d.maxOrderQuantity == null) {
        showError(
          `${WEEKDAY_LABELS[day]}의 최소/최대 주문 수량을 입력해주세요.`
        );
        return;
      }

      if (d.minOrderQuantity > d.maxOrderQuantity) {
        showError(
          `${WEEKDAY_LABELS[day]}의 최소 수량이 최대 수량보다 클 수 없어요.`
        );
        return;
      }

      if (!d.pickupTimeRange) {
        showError(`${WEEKDAY_LABELS[day]}의 픽업 시간을 설정해주세요.`);
        return;
      }

      if (d.pickupTimeRange.startTime >= d.pickupTimeRange.endTime) {
        showError(`${WEEKDAY_LABELS[day]}의 픽업 시간 순서를 확인해주세요.`);
        return;
      }

      if (d.breakTimeRange) {
        if (d.breakTimeRange.startTime >= d.breakTimeRange.endTime) {
          showError(`${WEEKDAY_LABELS[day]}의 휴게 시간 순서를 확인해주세요.`);
          return;
        }

        if (
          d.breakTimeRange.startTime < d.pickupTimeRange.startTime ||
          d.breakTimeRange.endTime > d.pickupTimeRange.endTime
        ) {
          showError(
            `${WEEKDAY_LABELS[day]}의 휴게 시간이 픽업 시간 안에 있어야 해요.`
          );
          return;
        }
      }
    }

    try {
      const dailySchedules = ALL_WEEKDAYS.map((day) => {
        const d = daysMap[day];

        if (!d.available) {
          return { dayOfWeek: day, available: false };
        }

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
        startDate: periodDates.startDate,
        endDate: periodDates.endDate,
        minimumOrderDeadlineDays: Number(minOrderDays),
        dailySchedules,
      });

      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      setShowSuccessToast(true);
      successTimerRef.current = setTimeout(() => {
        setShowSuccessToast(false);
      }, 2000);
    } catch (error) {
      console.error('운영 정보 저장 실패:', error);
      const message =
        error instanceof Error
          ? error.message
          : '저장에 실패했어요. 다시 시도해주세요.';
      showError(message);
    }
  };

  const currentDayInterval = scheduleData.dailySchedules?.find(
    (d) => d.dayOfWeek === selectedDay
  )?.intervalMinutes;

  return (
    <main className="w-full flex flex-col px-4 items-start">
      <div className="self-stretch w-full flex flex-col items-start gap-2 mt-2 mb-[24px]">
        <PeriodSettingField
          startDate={periodDates.startDate}
          endDate={periodDates.endDate}
          onSave={(startDate, endDate) =>
            setPeriodDates({ startDate, endDate })
          }
        />
        <div className="self-stretch w-full flex items-start gap-1">
          <AlertIcon className="size-4 text-icon-subtlest" />
          <span className="text-text-subtlest text-xs font-normal font-['Pretendard'] leading-4">
            해당 일정이 적용되는 기간을 설정해주세요
          </span>
        </div>
      </div>

      {/* 최소 주문 기한: 기간 설정 필요 */}
      <div
        onClickCapture={(e) => {
          if (!guardMinOrderDays()) {
            e.preventDefault();
            (e.target as HTMLElement).blur?.();
          }
        }}
      >
        <MinOrderDaysField value={minOrderDays} onChange={setMinOrderDays} />
      </div>

      <div className="self-stretch w-full flex flex-col items-start">
        {/* 요일별 탭: 기간 + 최소기한 필요 */}
        <div
          onClickCapture={(e) => {
            if (!guardWeekday()) {
              e.preventDefault();
              (e.target as HTMLElement).blur?.();
            }
          }}
          className="self-stretch w-full"
        >
          <WeekdayTabs
            selectedDay={selectedDay}
            availableDays={availableDays}
            onSelectDay={setSelectedDay}
          />

          <div className="self-stretch w-full">
            <WeekdayNavigator
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          </div>
        </div>

        <div className="self-stretch w-full flex flex-col gap-6">
          {/* available 토글: 기간 + 최소기한 필요 */}
          <div
            onClickCapture={(e) => {
              if (!guardWeekday()) {
                e.preventDefault();
                (e.target as HTMLElement).blur?.();
              }
            }}
          >
            <OrderAvailableToggle
              checked={currentDay.available}
              onChange={(available) => updateCurrentDay({ available })}
            />
          </div>

          {/* 수량: 기간 + 최소기한 + available 필요 */}
          <div
            onClickCapture={(e) => {
              if (!guardDayDetail()) {
                e.preventDefault();
                (e.target as HTMLElement).blur?.();
              }
            }}
          >
            <OrderQuantityFields
              minQuantity={
                currentDay.minOrderQuantity != null
                  ? String(currentDay.minOrderQuantity)
                  : ''
              }
              maxQuantity={
                currentDay.maxOrderQuantity != null
                  ? String(currentDay.maxOrderQuantity)
                  : ''
              }
              onMinChange={(value) =>
                updateCurrentDay({
                  minOrderQuantity: value === '' ? null : Number(value),
                })
              }
              onMaxChange={(value) =>
                updateCurrentDay({
                  maxOrderQuantity: value === '' ? null : Number(value),
                })
              }
            />
          </div>

          <div className="self-stretch w-full flex flex-col gap-3">
            <span className="text-text-default text-body font-medium font-['Pretendard']">
              픽업 시간
            </span>
            {/* 픽업 시간(영업시간): 기간 + 최소기한 + available 필요 */}
            <div
              onClickCapture={(e) => {
                if (!guardDayDetail()) {
                  e.preventDefault();
                  (e.target as HTMLElement).blur?.();
                }
              }}
            >
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
          </div>
          <div className="w-full flex flex-col gap-3 mt-[-14px]">
            {/* 휴게 시간: 기간 + 최소기한 + available 필요 */}
            <div
              onClickCapture={(e) => {
                if (!guardDayDetail()) {
                  e.preventDefault();
                  (e.target as HTMLElement).blur?.();
                }
              }}
            >
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
            </div>

            <div className="self-stretch w-full flex items-start gap-1 pb-11">
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

      {showErrorToast && <ToastError text={errorMessage} bottom={182} />}
      {showSuccessToast && (
        <SuccessToast text="저장이 완료되었습니다" bottom={182} />
      )}
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
