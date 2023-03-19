import {monthInfoType} from '../01_Components/Main/Main'
import {WeekType} from '../reducers/tasksReducer'

export const getWeeksNumbersRelatedToMonth = (obj: monthInfoType[], year: number) => {
    let weekCounter = 1
    return obj.map((month) => {
        const weeks: WeekType[] = []
        for (let i = weekCounter; i < weekCounter + month.fullWeeks; i++) {
            weeks.push({week: i, year})
        }
        weekCounter += month.fullWeeks
        return {...month, weekNumbers: weeks}
    })
    console.log(obj)
}