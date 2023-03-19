import {useCallback, useEffect, useState} from 'react'
import {v1} from 'uuid'
import s from './main.module.scss'
import {
    validateDatesOrder
} from '../../utils/validateDatesOrder'
import {TaskType, WeekType} from '../../reducers/tasksReducer'
import {Task} from '../Task/Task'
import {Container} from '../Container/Container'
import {AddTask} from '../AddTask/AddTask'
import {EditTask} from '../EditTask/EditTask'
import {getQuarterNumber} from '../../utils/getQuarterNumber'
import {getWeeksNumbersRelatedToMonth} from '../../utils/getWeeksNumbersRelatedToMonth'
import {getWeeksAndYearsForTask} from '../../utils/getWeeksAndYearsForTask'
import {getMonthsInfoArray} from '../../utils/getMonthsInfoArray'
import {Button} from '../Button/Button'

export type monthInfoType = {
    id: string
    month: string
    quarterNumber: number
    restDays: number
    totalDaysInMonth: number
    fullWeeks: number
    weekNumbers?: WeekType[]
}

export const Main = () => {
    console.log('Main   render')
    const [year, setYear] = useState(new Date().getFullYear())
    const [quarter, setQuarter] = useState(getQuarterNumber(new Date().getMonth()))
    const [startDate, setStartDate] = useState<string>('') // Date to show in task
    const [endDate, setEndDate] = useState<string>('') // Date to show in task
    const [taskName, setTaskName] = useState('')
    const [tasks, setTasks] = useState<TaskType[]>([]) // Max length 10
    const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null)

    // Form months array for current year
    const monthsInfo = getMonthsInfoArray(year)
    // Add to every month array with relative weeks numbers
    const monthsWithWeeks = getWeeksNumbersRelatedToMonth(monthsInfo, year)
    const quartersToRender = monthsWithWeeks.filter((el) => el.quarterNumber === quarter)

    const handleAddTask = () => {
        if (!startDate || !endDate) return
        // Check if start date is earlier than end date
        if (!validateDatesOrder(startDate, endDate)) {
            alert('End date should be greater than start date')
            return
        }
        if (startDate && endDate && taskName) {
            // Get task first week and last week
            const allWeeksAndYears = getWeeksAndYearsForTask(startDate, endDate)
            const weeksInQuarter: Array<WeekType[]> = []

            // Get array of the weeks numbers, to render
            quartersToRender.forEach((el) => {
                weeksInQuarter.push(el.weekNumbers)
            })

            const task = {
                id: v1(),
                allWeeksAndYears,
                name: taskName,
                weeksInQuarter, // Array to map, with weeks numbers, that are in this quarter
                startDate,
                endDate,
            }
            setTasks((prev) => [...prev, task])
            setTaskName('')
        }
    }

    const handleRemove = (taskId: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
    }
    const handleChangeQuarter = useCallback((flag: 'back' | 'forward') => {
        if (flag === 'back') {
            if (quarter === 1) {
                setQuarter(4)
                setYear((prev) => prev - 1)
            } else {
                setQuarter((prev) => prev - 1)
            }
        }
        if (flag === 'forward') {
            if (quarter === 4) {
                setQuarter(1)
                setYear((prev) => prev + 1)
            } else {
                setQuarter((prev) => prev + 1)
            }
        }
    }, [quarter])
    // Update quarter array in tasks
    useEffect(() => {
        if (tasks.length !== 0) {
            const newWeeksArr: Array<WeekType[]> = []
            quartersToRender.forEach(el => {
                newWeeksArr.push(el.weekNumbers)
            })
            setTasks(prev => [...prev].map(task => ({...task, weeksInQuarter: newWeeksArr})))
        }
    }, [quarter])


    const handleEditTask = (taskId: string, title: string, startDate: string, endDate: string) => {

        setTasks((prev) => [...prev].map((task) => (task.id === taskId ? {
            ...task,
            name: title,
            startDate,
            endDate,
            allWeeksAndYears: getWeeksAndYearsForTask(startDate, endDate)
        } : task)))
    }

    return (
        <Container>
            <div className={s.addTask}>
                <AddTask taskName={taskName} startDate={startDate} endDate={endDate} setTaskName={setTaskName}
                         setStartDate={setStartDate} setEndDate={setEndDate} handleAddTask={handleAddTask}
                         maxCountExceeded={tasks.length === 10}/>
            </div>

            {taskToEdit && <EditTask taskId={taskToEdit.id} taskName={taskToEdit.name} startDate={taskToEdit.startDate}
                                     endDate={taskToEdit.endDate} handleEditTask={handleEditTask}
                                     handleRemove={handleRemove} setTaskToEdit={setTaskToEdit}/>}
            <table className={s.quarterTable}>
                <>
                    <thead>
                    <tr>
                        <th><Button onClick={() => handleChangeQuarter('back')} type="success" value="<"/></th>
                        <th>Quarter {quarter}, {year}</th>
                        <th><Button onClick={() => handleChangeQuarter('forward')} type="success" value=">"/></th>

                        {quartersToRender.map((el) => (
                            <th key={v1()} className={s.monthName}>
                                {el.month}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={s.infoRow}>
                        <td className={s.infoItem}>Title</td>
                        <td className={s.infoItem}>Start</td>
                        <td className={s.infoItem}>End</td>
                        {quartersToRender.map((el) => (
                            <td key={v1()} className={s.quarterWeeksNumbers}>
                                {el.weekNumbers
                                    ? el.weekNumbers.map((w) => (
                                        <td key={v1()} className={s.quarterWeekNumber}>
                                            {w.week}
                                        </td>
                                    ))
                                    : null}
                            </td>
                        ))}
                    </tr>
                    {tasks && tasks.map((task) => {
                        return <Task key={task.id} task={task} setTaskToEdit={setTaskToEdit}/>
                    })}
                    </tbody>
                </>
            </table>
            <div className={s.hint}>
                {tasks && tasks.length === 0 && <div>* No task to show, please add new task</div>}
                <div>* Double click on task for edit</div>
                <div>* Hover on task title for info</div>
            </div>
        </Container>
    )
}