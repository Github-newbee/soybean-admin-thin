import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 常量
export const DATE_TIME_SECOND = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TODAY = formatDate(dayjs());

export function formatDate(date: Dayjs | string, fmt = DATE_TIME_SECOND): string {
  if (!date) {
    return '';
  }
  return dayjs(date).format(fmt);
}

// 格式化时间戳,将2012-2-3 12:00:23 转为时间戳
export function formatUnix(date: number, format = DATE_TIME_SECOND): string {
  if (!date) {
    return '';
  }
  const time = dayjs.unix(date).format(format);
  return time;
}

/**
 * 两个时间间隔多少天
 *
 * @param timeArr
 * @param format
 * @returns
 */
export const timeDiff = (timeArr: string[], format: any): number => {
  if (timeArr.length !== 2) {
    return 0;
  }
  const diffDay = dayjs(timeArr[1]).diff(dayjs(timeArr[0]), format);
  return diffDay + 1;
};

// 最近七天
export const withLatestWeek = (format = DATE_FORMAT): string[] => {
  const now = dayjs().format(format);
  const day7s = dayjs().subtract(7, 'day').format(format);
  return [day7s, now];
};

// 最近一周到前一天
export const lastWeek = (format = DATE_TIME_SECOND): string[] => {
  const lastDay = dayjs().startOf('day').subtract(1, 'second').format(format);
  const day8s = dayjs().subtract(8, 'day').startOf('day').format(format);
  return [day8s, lastDay];
};

// 最近一个月或几个月到前一天
export const withLastMonth = (month = 1, format = DATE_FORMAT): string[] => {
  const lastDay = dayjs().subtract(1, 'day').format(format);
  const day8s = dayjs().subtract(month, 'month').format(format);
  return [day8s, lastDay];
};

// 最近一个月
export const lastMonth = (format = DATE_FORMAT): string[] => {
  const lastDay = dayjs().startOf('month').subtract(1, 'second').format(format);
  const day8s = dayjs().subtract(1, 'month').startOf('month').format(format);
  return [day8s, lastDay];
};

// date2在date之后
export const isAfter = (date: Dayjs | string, date2: Dayjs | string): boolean => {
  return dayjs(date).isAfter(date2);
};

// 日期禁止选择之前或之后
// export const disabledDateFunc = (time: Date): boolean => {
//   // true: 禁止选中，false:可以选中
//   const dataDisabled = isAfter(new Date(), time);
//   return !dataDisabled;
// };

// 分钟转 天小时分钟
export const mToDayhm = (value: number): string => {
  if (value === 60) {
    return `1小时`;
  }
  const time: number[] = [];
  const day = Math.floor(value / 60 / 24);
  const hour = Math.floor((value / 60) % 24);
  const min = value % 60;
  time[0] = day > 0 ? day : 0;
  time[1] = hour > 0 ? hour : 0;
  time[2] = min > 0 ? min : 0;
  if (value >= 1440) {
    if (!(value % 1440)) {
      return `${time[0]}天`;
    }
    return `${time[0]}天${time[1]}小时${time[2]}分钟`;
  } else if (value > 60) {
    return `${time[1]}小时${time[2]}分钟`;
  }
  return `${time[2]}分钟`;
};

/**
 * 格式化显示营业时间 1440显示成24点
 *
 * @param startTime
 * @param endTime
 * @returns
 */
export const changeTimeFormat = (startTime: number, endTime: number): string => {
  if (endTime === 1440) {
    return `${minuteToHours(startTime)}-24:00`;
  }
  return `${minuteToHours(startTime)}-${minuteToHours(endTime)}`;
};

/**
 * 距当前时间
 *
 * @param start
 * @returns
 */
export function getDaysBetween(start: string | Date): string {
  const now = new Date().getTime();
  const startDay = new Date(start).getTime();
  let time: number = (startDay - now) / (1 * 24 * 60 * 60 * 1000); // 天

  if (time > 0 && time < 1) {
    time = time * 1000 * 60; // 分钟
    return '1天';
  } else if (time <= 0) {
    return '0天';
  }
  return `${Math.ceil((startDay - now) / (1 * 24 * 60 * 60 * 1000))}天`;
}

// 分钟转小时分钟
export function minuteToHours(minutes: number): string {
  if (!minutes) return '00:00';
  if (minutes === 1440) {
    return '24:00';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `00:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}`;
  } else if (hours > 0 && hours < 10) {
    return `0${hours}:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}`;
  }
  return `${hours}:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}`;
}

// 小时转分钟
export function hoursToMinute(time: string): number {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export const dateUtil = dayjs;
