import {parseDateString} from '../utils/parseDateString'


it('Returns correct numbers after parsing dates strings', () => {
    const startDate = '2023-01-31'
    const endDate = '2024-11-21'

    const result = parseDateString(startDate, endDate)

    expect(result.startYear).toEqual(2023)
    expect(result.startMonth).toEqual(1)
    expect(result.startDay).toEqual(31)
    expect(result.endYear).toEqual(2024)
    expect(result.endMonth).toEqual(11)
    expect(result.endDay).toEqual(21)
})
