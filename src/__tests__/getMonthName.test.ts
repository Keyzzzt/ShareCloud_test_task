import {getMonthName} from '../utils/getMonthName'


it('Returns a correct first and last month names', () => {
    const january = {name: 'January', index: 0}
    const december = {name: 'December', index: 11}
    const firstMonth = getMonthName(january.index)
    const lastMonth = getMonthName(december.index)

    expect(firstMonth).toEqual(january.name)
    expect(lastMonth).toEqual(december.name)

})