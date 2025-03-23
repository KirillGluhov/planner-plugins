/*export function getMonth(date: number | null | undefined): string
{
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    if (date)
    {
        return months[date] ?? "";
    }
    
    return "";
}*/

/*export function getNumberOfDays(year: number, month: number): number
{
    const longMonths = [0,2,4,6,7,9,11];
    const middleMonths = [3,5,8,10];
    const shortMonth = 1;

    if (longMonths.includes(month))
    {
        return 31;
    }
    else if (middleMonths.includes(month))
    {
        return 30;
    }
    else
    {
        if (year % 400 === 0)
        {
            return 29;
        }
        else if (year % 100 === 0)
        {
            return 28;
        }
        else if (year % 4 === 0)
        {
            return 29;
        }
        else 
        {
            return 28;
        }
    }
}*/

/*export function getFirstDayOfMonth(dayOfWeek: number, dayOfMonth: number): number
{
    const dayOfFirstWeek = dayOfMonth % 7;
    
    if (dayOfFirstWeek === 0)
    {
        return (dayOfWeek + 1) % 7;
    }
    else if (dayOfFirstWeek === 1)
    {
        return dayOfWeek;
    }
    else
    {
        return ((dayOfWeek - (dayOfFirstWeek - 1)) + 7) % 7;
    }
    
}*/

/*export function getNameOfWeekDay(dayOfWeek: number): string
{
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    return daysOfWeek[dayOfWeek] ?? "";
}*/

/*export function getWeeksNumber(firstMonthDay: number, daysInMonth: number)
{
    if (firstMonthDay === 1)
    {
        return Math.ceil(daysInMonth / 7);
    }
    else
    {
        const daysWithoutFirstWeek = daysInMonth - (8 - firstMonthDay);
        return Math.ceil(daysWithoutFirstWeek / 7) + 1;
    }
}*/

export function getDateWithoutOffset(weekDay: number, weekInMonth: number): number
{
    return (1 + weekDay) + weekInMonth * 7;
}

export function getDateFromNextMonth(monthDay: number, daysInMonth: number): number
{
    return (monthDay % daysInMonth === 0) ? daysInMonth : (monthDay % daysInMonth);
}

export function getStartDay(daysNumberInPreviousMonth: number, dayInWeekNumberForFirstDayInMonth: number): number
{
    const improvedWeekDay = dayInWeekNumberForFirstDayInMonth === 0 ? 7 : dayInWeekNumberForFirstDayInMonth;
    return (daysNumberInPreviousMonth + 1) - (improvedWeekDay - 1);
}