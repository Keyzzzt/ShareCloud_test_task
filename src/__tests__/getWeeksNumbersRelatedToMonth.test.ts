import {getWeeksNumbersRelatedToMonth} from '../utils/getWeeksNumbersRelatedToMonth'
import {WeekType} from '../reducers/tasksReducer'



it('Return same object with added weekNumbers array of type WeekType', () => {
    const year = 2023
    const months = [
        {
            id: 'someId',
            month: 'January',
            daysThisMonthPlusRest: 31,
            fullWeeks: 4,
            quarterNumber: 1,
            restDays: 0,
            totalDaysInMonth: 31
        }
    ]

    const result = getWeeksNumbersRelatedToMonth(months, year)

    expect(result[0].weekNumbers).toBeTruthy()
    expect(result[0].weekNumbers.length).toEqual(4)

})

