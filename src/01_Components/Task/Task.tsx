import {TaskType} from '../../reducers/tasksReducer'
import {FC, memo, useState} from 'react'
import s from './task.module.scss'
import {v1} from 'uuid'
import {Tooltip} from '../Tooltip/Tooltip'

type TaskProps = {
    task: TaskType
    setTaskToEdit: (task: TaskType) => void
}

export const Task: FC<TaskProps> = memo(({task, setTaskToEdit}) => {
    console.log('Task   render')
    const [showTip, setShowTip] = useState(false)
    return (
        <>
            <tr className={s.taskRow} onDoubleClick={() => setTaskToEdit(task)} >
                <td onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
                    {task.name}
                    <Tooltip title={task.name} start={task.startDate} end={task.endDate} showTip={showTip} />

                </td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                {task.weeksInQuarter &&
                    task.weeksInQuarter.map((weeks) => {
                        return (
                            <td className={s.taskWeeksRow} key={v1()}>
                                {weeks.map((weekNumber) => {
                                    const className = task.allWeeksAndYears?.some(el => el.week === weekNumber.week && el.year === weekNumber.year) ? `${s.activeWeekCell} ${s.taskWeekCell}` : s.taskWeekCell
                                    return (
                                        <td key={v1()} className={className}> </td>
                                    )
                                })}
                            </td>
                        )
                    })}
            </tr>
        </>
    )
})