import { format, isToday, isYesterday, differenceInMinutes, differenceInHours } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatTimeToString(inputDateTime: string): string {
  const date = new Date(inputDateTime);

  if (date) {
    const now = new Date();

    if (isToday(date)) {
      const minutesDiff = differenceInMinutes(now, date);
      const hoursDiff = differenceInHours(now, date);

      if (minutesDiff < 1) {
        return 'vừa xong';
      } else if (minutesDiff < 60) {
        return `${minutesDiff} phút trước`;
      } else if (hoursDiff < 24) {
        return format(date, 'h:mm a');
      }
    } else if (isYesterday(date)) {
      return `Hôm qua`;
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  }

  return '';
}
