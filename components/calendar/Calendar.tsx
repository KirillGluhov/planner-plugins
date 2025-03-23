import { useEffect, useState } from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { getDateFromNextMonth, getDateWithoutOffset, getStartDay } from "./utils";
import { MonthCalendar } from "./MonthCalendar";

export const Calendar = () => {
 
    const [currentDate, setCurrentDate] = useState<MonthCalendar | null>(null);
    const [currentOffset, setCurrentOffset] = useState<number>(0);

    useEffect(() => {
        const rawDate = new Date();
        rawDate.setMonth(rawDate.getMonth() + currentOffset);
        rawDate.setHours(0,0,0,0);

        const date = new MonthCalendar(rawDate);
        setCurrentDate(date);
    },[currentOffset])

    return <View style={styles.wrapper}>
        <View style={styles.calendar}>
            <View style={styles.month}>
                <TouchableOpacity onPress={() => setCurrentOffset(currentOffset - 1)}>
                    <Image source={require("./arrowleft.png")} style={styles.arrow}/>
                </TouchableOpacity>
                <Text style={styles.title}>{currentDate && currentDate?.getMonthName()}</Text>
                <TouchableOpacity onPress={() => setCurrentOffset(currentOffset + 1)}>
                    <Image source={require("./arrowright.png")} style={styles.arrow}/>
                </TouchableOpacity>
            </View>
            <View style={styles.mainPart}>
            {
                currentDate && currentDate.generateMonthTable().map((week, i) => (
                    <View style={styles.oneWeek} key={i}>
                        <Text style={styles.title}>{currentDate.getDayOfWeekName(i)}</Text>
                        {
                            week.map((day, j) => (
                                <Text key={`${i}_${j}`} style={
                                    [
                                        styles.text,
                                        day.isCurrentDay ? styles.currentDay : "",
                                        day.isCurrentMonth ? "" : styles.lastMonth
                                    ]
                                }>{day.value}</Text>
                            ))
                        }
                    </View>
                ))
            }
            </View>
            <View style={styles.year}>
                <TouchableOpacity onPress={() => setCurrentOffset(currentOffset - 12)}>
                    <Image source={require("./arrowleft.png")} style={styles.arrow}/>
                </TouchableOpacity>
                <Text style={styles.title}>{currentDate && currentDate?.getYear()}</Text>
                <TouchableOpacity onPress={() => setCurrentOffset(currentOffset + 12)}>
                    <Image source={require("./arrowright.png")} style={styles.arrow}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        alignItems: "center",
        marginTop: 24
    },
    calendar: {
        backgroundColor: "#FFFFFF",
        boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
        borderRadius: 16,
        flexDirection: "column",
        padding: 12
    },
    arrow: {
        width: 16,
        height: 16
    },
    calendarInner: {
        flexDirection: "column"
    },
    oneWeek: {
        flexDirection: "column",
        alignItems: "center",
        gap: 12
    },
    month: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    year: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    week: {
        flexDirection: "row"
    },
    mainPart: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 12,
        gap: 12
    },
    title: {
        fontFamily: "GothamPro-Bold",
        fontSize: 16
    },
    text: {
        fontFamily: "GothamPro",
        fontSize: 16
    },
    lastMonth: {
        color: "#C9C9C9"
    },
    currentDay: {
        color: "#FF0028"
    }
})

/*

{new Array(7).fill(null).map((_, index) => (
                <View style={styles.oneWeek} key={index}>
                    <Text style={styles.title}>{getNameOfWeekDay(index)}</Text>
                    {
                        new Array(weeksNumber).fill(null).map((_, ind) => (
                            (firstDayOfMonth === 1) ?
                            <Text style={
                                [styles.text, (currentDate && currentDate.getDate() === (1 + index) + ind * 7) ? styles.currentDay : ""]
                            }>{(1 + index) + ind * 7}</Text>
                            :
                                (ind === 0) ? 
                                <Text style={[styles.text, styles.lastMonth]}>{daysNumberInPreviousMonth - (8 - firstDayOfMonth)}</Text>
                                :
                                <Text style={[styles.text]}>{((daysNumberInPreviousMonth - (8 - firstDayOfMonth)) + 7 - daysNumberInPreviousMonth) + index + ind * 7}</Text>
                        ))
                    }
                    {
                        new Array(weeksNumber).fill(null).map((_, ind) => (
                            <Text style={
                                [styles.text, (currentDate && currentDate.getDate() === (1 + index) + ind * 7) ? styles.currentDay : ""]
                            }>{((1 + index) + ind * 7) % numberOfDays}</Text>
                        ))
                    }
                    {
                        new Array(weeksNumber).fill(null).map((_, ind) => (
                            (firstDayOfMonth === 1) ?
                            <Text
                                style={
                                    [
                                        styles.text, 
                                        (getDateWithoutOffset(index, ind) > numberOfDays ? styles.lastMonth : ""), 
                                        (currentDate && currentDate.getDate() === getDateWithoutOffset(index, ind) ? styles.currentDay : "")
                                    ]
                                }
                            >
                                {getDateFromNextMonth(getDateWithoutOffset(index, ind), numberOfDays)}
                            </Text>
                            :
                            ((ind === 0) ?
                            <Text style={
                                [
                                    styles.text, 
                                    (
                                        currentDate && 
                                        currentDate.getDate() === getDateFromNextMonth(getStartDay(daysNumberInPreviousMonth, firstDayOfMonth) + index, daysNumberInPreviousMonth) 
                                        ? styles.currentDay : 
                                        ""
                                    ),
                                    (
                                        getStartDay(daysNumberInPreviousMonth, firstDayOfMonth) + index > daysNumberInPreviousMonth ? "" : styles.lastMonth
                                    )
                                ]
                            }>{getDateFromNextMonth(getStartDay(daysNumberInPreviousMonth, firstDayOfMonth) + index, daysNumberInPreviousMonth)}</Text> :
                            <Text>{(getDateFromNextMonth(getStartDay(daysNumberInPreviousMonth, firstDayOfMonth) + index, daysNumberInPreviousMonth) + 7 * ind) % daysNumberInPreviousMonth}</Text>)
                        ))
                    }
                    {<Text style={[styles.text, styles.lastMonth]}>24</Text>
                    <Text style={styles.text}>3</Text>
                    <Text style={styles.text}>10</Text>
                    <Text style={styles.text}>17</Text>
                    <Text style={styles.text}>24</Text>
                    <Text style={styles.text}>31</Text>}
                    </View>
                ))}
                    {<View style={styles.oneWeek}>
                        <Text style={styles.title}>Пн</Text>
                        <Text style={[styles.text, styles.lastMonth]}>24</Text>
                        <Text style={styles.text}>3</Text>
                        <Text style={styles.text}>10</Text>
                        <Text style={styles.text}>17</Text>
                        <Text style={styles.text}>24</Text>
                        <Text style={styles.text}>31</Text>
                    </View>
                    <View style={styles.oneWeek}>
                        <Text style={styles.title}>Вт</Text>
                        <Text style={[styles.text, styles.lastMonth]}>25</Text>
                        <Text style={styles.text}>4</Text>
                        <Text style={styles.text}>11</Text>
                        <Text style={styles.text}>18</Text>
                        <Text style={styles.text}>25</Text>
                        <Text style={[styles.text, styles.lastMonth]}>1</Text>
                    </View>
                    <View style={styles.oneWeek}>
                        <Text style={styles.title}>Ср</Text>
                        <Text style={[styles.text, styles.lastMonth]}>26</Text>
                        <Text style={styles.text}>5</Text>
                        <Text style={styles.text}>12</Text>
                        <Text style={styles.text}>19</Text>
                        <Text style={styles.text}>26</Text>
                        <Text style={[styles.text, styles.lastMonth]}>2</Text>
                    </View>
                    <View style={styles.oneWeek}>
                        <Text style={styles.title}>Чт</Text>
                        <Text style={[styles.text, styles.lastMonth]}>27</Text>
                        <Text style={styles.text}>6</Text>
                        <Text style={styles.text}>13</Text>
                        <Text style={[styles.text, styles.currentDay]}>20</Text>
                        <Text style={styles.text}>27</Text>
                        <Text style={[styles.text, styles.lastMonth]}>3</Text>
                    </View>
                    <View style={styles.oneWeek}>
                        <Text style={styles.title}>Пт</Text>
                        <Text style={[styles.text, styles.lastMonth]}>28</Text>
                        <Text style={styles.text}>7</Text>
                        <Text style={styles.text}>14</Text>
                        <Text style={styles.text}>21</Text>
                        <Text style={styles.text}>28</Text>
                        <Text style={[styles.text, styles.lastMonth]}>4</Text>
                    </View>
                    <View style={styles.oneWeek}>
                        <Text style={styles.title}>Сб</Text>
                        <Text style={styles.text}>1</Text>
                        <Text style={styles.text}>8</Text>
                        <Text style={styles.text}>15</Text>
                        <Text style={styles.text}>22</Text>
                        <Text style={styles.text}>29</Text>
                        <Text style={[styles.text, styles.lastMonth]}>5</Text>
                    </View>
                    <View style={styles.oneWeek}>
                        <Text style={styles.title}>Вс</Text>
                        <Text style={styles.text}>2</Text>
                        <Text style={styles.text}>9</Text>
                        <Text style={styles.text}>16</Text>
                        <Text style={styles.text}>23</Text>
                        <Text style={styles.text}>30</Text>
                        <Text style={[styles.text, styles.lastMonth]}>6</Text>
                    </View>}

*/

/*const daysInMonth = getNumberOfDays(date.getFullYear(), date.getMonth());
        const firstMonthDay = getFirstDayOfMonth(date.getDay(), date.getDate());

        setNumberOfDays(daysInMonth);
        setFirstDayOfMonth(firstMonthDay);
        setWeeksNumber(getWeeksNumber(firstMonthDay, daysInMonth));
        
        const datePreviousMonth = new Date();
        datePreviousMonth.setMonth(datePreviousMonth.getMonth() - 1);
        datePreviousMonth.setHours(0,0,0,0);

        setDaysNumberInPreviousMonth(getNumberOfDays(datePreviousMonth.getFullYear(), datePreviousMonth.getMonth()));*/