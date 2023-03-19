export const getDaysInMonth = function (month: number, year: number) {
    return new Date(year, month, 0).getDate()
}