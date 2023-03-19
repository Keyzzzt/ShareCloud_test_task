import {validateDatesOrder} from '../utils/validateDatesOrder'


it('Returns false when wrong end date', () => {
    const startDate = '2023-02-20'
    const wrongEndYear = '2022-01-31'
    const wrongEndMonth = '2023-01-20'
    const wrongEndDay = '2023-02-12'

    const resultWrongYear = validateDatesOrder(startDate, wrongEndYear)
    const resultWrongMonth = validateDatesOrder(startDate, wrongEndMonth)
    const resultWrongDay = validateDatesOrder(startDate, wrongEndDay)

    expect(resultWrongYear).toEqual(false)
    expect(resultWrongMonth).toEqual(false)
    expect(resultWrongDay).toEqual(false)
})

it('Returns false when wrong start date', () => {
    const wrongStartYear = '2024-01-31'
    const wrongStartMonth = '2023-04-20'
    const wrongStartDay = '2023-02-25'
    const endDate = '2023-02-20'

    const resultWrongYear = validateDatesOrder(wrongStartYear, endDate)
    const resultWrongMonth = validateDatesOrder(wrongStartMonth, endDate)
    const resultWrongDay = validateDatesOrder(wrongStartDay, endDate)

    expect(resultWrongYear).toEqual(false)
    expect(resultWrongMonth).toEqual(false)
    expect(resultWrongDay).toEqual(false)
})

it('Returns true when correct dates', () => {
    const startDate = '2023-02-20'
    const endDate = '2024-03-31'

    const result = validateDatesOrder(startDate, endDate)

    expect(result).toEqual(true)
})
