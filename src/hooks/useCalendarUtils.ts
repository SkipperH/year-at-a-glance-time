
export const useCalendarUtils = () => {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const formatMonthKey = (year: number, month: number) => {
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

  const totalDaysInYear = (year: number) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
  };

  return {
    getDaysInMonth,
    getFirstDayOfMonth,
    formatDateKey,
    formatMonthKey,
    totalDaysInYear
  };
};
