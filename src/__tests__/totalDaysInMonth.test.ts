import {getDaysInMonth} from '../utils/totalDaysInMonth'


it('Returns correct for december and february', () => {
    const nonLeapYear = 2023
    const leapYear = 2024
    const daysInFebruaryLeapYear = {totalDays: 29, monthNumber: 2}
    const daysInFebruaryNONLeapYear = {totalDays: 28, monthNumber: 2}
    const daysInDecember = {totalDays: 31, monthNumber: 12}

    const result1 = getDaysInMonth(daysInFebruaryLeapYear.monthNumber, leapYear)
    const result2 = getDaysInMonth(daysInFebruaryNONLeapYear.monthNumber, nonLeapYear)
    const result3 = getDaysInMonth(daysInDecember.monthNumber, nonLeapYear)

    expect(result1).toEqual(29)
    expect(result2).toEqual(28)
    expect(result3).toEqual(31)
})
