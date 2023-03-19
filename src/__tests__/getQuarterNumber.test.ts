import {getQuarterNumber} from '../utils/getQuarterNumber'


it('Returns a quarter number according to month number(1 - 12)', () => {
    const january = {quarter: 1, monthNumber: 1}
    const may = {quarter: 2, monthNumber: 5}
    const july = {quarter: 3, monthNumber: 7}
    const december = {quarter: 4, monthNumber: 12}

    const januaryQuarter = getQuarterNumber(january.monthNumber)
    const mayQuarter = getQuarterNumber(may.monthNumber)
    const julyQuarter = getQuarterNumber(july.monthNumber)
    const decemberQuarter = getQuarterNumber(december.monthNumber)

    expect(januaryQuarter).toEqual(january.quarter)
    expect(mayQuarter).toEqual(may.quarter)
    expect(julyQuarter).toEqual(july.quarter)
    expect(decemberQuarter).toEqual(december.quarter)


})