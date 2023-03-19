import {totalDaysInYear} from '../utils/totalDaysInYear'


it('Returns correct days in a leap / non leap years', () => {
    const nonLeapYear = 2023
    const leapYear = 2024

    const result1 = totalDaysInYear(nonLeapYear)
    const result2 = totalDaysInYear(leapYear)

    expect(result1).toEqual(365)
    expect(result2).toEqual(366)
})
