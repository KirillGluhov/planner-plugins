import { useEffect, useState } from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MonthCalendar } from "./MonthCalendar";

const Calendar = () => {
 
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

export default Calendar;

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