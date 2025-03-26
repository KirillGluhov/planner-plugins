import { CalendarDay, CalendarDayNullable } from "./Types";

export class MonthCalendar
{
    private currentDate: Date;
    public monthNumber: number;
    public monthPreviousNumber: number;
    public monthWeekDayOfFirstDay: number;
    public monthWeekDayOfLastDay: number;

    constructor(date: Date)
    {
        this.currentDate = date;

        this.monthNumber = this.getMonthLength(date);

        const datePreviousMonth = new Date(date);
        datePreviousMonth.setMonth(datePreviousMonth.getMonth() - 1);
        datePreviousMonth.setHours(0,0,0,0);

        this.monthPreviousNumber = this.getMonthLength(datePreviousMonth);

        this.monthWeekDayOfFirstDay = this.getNumberOfWeekDayForFirstDayOfMonth(date);

        this.monthWeekDayOfLastDay = this.getNumberOfWeekDayForLastDayOfMonth(
            date, this.getMonthLength(date), this.getNumberOfWeekDayForFirstDayOfMonth(date)
        );
    }

    generateMonthTable()
    {
        const numberOfDaysFromPreviousMonth = (this.monthWeekDayOfFirstDay + 6) % 7;
        const numberOfDaysFromNextMonth = (7 - this.monthWeekDayOfLastDay) % 7;

        const prevDays: CalendarDayNullable[] = new Array(numberOfDaysFromPreviousMonth)
            .fill(this.monthPreviousNumber)
            .map((value, i) => ({value: value - ((numberOfDaysFromPreviousMonth-1) - i), isCurrentMonth: false}));

        const monthDays: CalendarDayNullable[] = new Array(this.monthNumber)
            .fill(0)
            .map((_, i) => ({value: i + 1, isCurrentMonth: true}));

        const nextDays: CalendarDayNullable[] = new Array(numberOfDaysFromNextMonth)
            .fill(1)
            .map((_, i) => ({value: i + 1, isCurrentMonth: false}));

        const days = [...prevDays, ...monthDays, ...nextDays];

        const weeks: CalendarDay[][] = Array.from({ length: 7 }, () => []);
        const currentTime = new Date();

        for (let i = 0; i < days.length; i++)
        {
            weeks[i%7].push(
                {
                    value: days[i].value, 
                    isCurrentDay: days[i].value == currentTime.getDate() && 
                        this.currentDate.getMonth() == currentTime.getMonth() && 
                        this.currentDate.getFullYear() == currentTime.getFullYear(), 
                    isCurrentMonth: days[i].isCurrentMonth
                }
            );
        }

        return weeks;
    }

    private getMonthLength(date: Date)
    {
        const longMonths = [0,2,4,6,7,9,11];
        const middleMonths = [3,5,8,10];
        const shortMonth = 1;

        if (longMonths.includes(date.getMonth()))
        {
            return 31;
        }
        else if (middleMonths.includes(date.getMonth()))
        {
            return 30;
        }
        else
        {
            if (date.getFullYear() % 400 === 0)
            {
                return 29;
            }
            else if (date.getFullYear() % 100 === 0)
            {
                return 28;
            }
            else if (date.getFullYear() % 4 === 0)
            {
                return 29;
            }
            else 
            {
                return 28;
            }
        }
    }

    getYear()
    {
        return this.currentDate.getFullYear();
    }

    getMonthName()
    {
        const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        return months[this.currentDate.getMonth()] ?? "";
    }

    getDayOfWeekName(day: number)
    {
        const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

        return daysOfWeek[day] ?? "";
    }

    getWeeksNumber()
    {
        if (this.monthWeekDayOfFirstDay === 1)
        {
            return Math.ceil(this.monthNumber / 7);
        }
        else
        {
            const daysWithoutFirstWeek = this.monthNumber - (8 - this.monthWeekDayOfFirstDay);
            return Math.ceil(daysWithoutFirstWeek / 7) + 1;
        }
    }

    private getNumberOfWeekDayForFirstDayOfMonth(date: Date)
    {
        const dayOfFirstWeek = date.getDate() % 7;
    
        if (dayOfFirstWeek === 0)
        {
            return (date.getDay() + 1) % 7;
        }
        else if (dayOfFirstWeek === 1)
        {
            return date.getDay();
        }
        else
        {
            return ((date.getDay() - (dayOfFirstWeek - 1)) + 7) % 7;
        }
    }

    private getNumberOfWeekDayForLastDayOfMonth(date: Date, monthNumber: number, monthWeekDayOfFirstDay: number)
    {
        return (monthWeekDayOfFirstDay + (monthNumber - 1)) % 7;
    }
}