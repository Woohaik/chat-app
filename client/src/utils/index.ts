const setAlwaysZeroBeforeDate = (target: number): string => `${target < 10 ? "0" : ""}${target}`;

export const getDateElements = (date: Date) => {
    return {
        day: setAlwaysZeroBeforeDate(date.getDate()),
        month: setAlwaysZeroBeforeDate(date.getMonth() + 1),
        year: date.getFullYear() + "",
        hour: setAlwaysZeroBeforeDate(date.getHours()),
        seconds: setAlwaysZeroBeforeDate(date.getSeconds()),
        minutes: setAlwaysZeroBeforeDate(date.getMinutes()),
    };
};