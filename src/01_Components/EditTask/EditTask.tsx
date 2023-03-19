import s from './editTask.module.scss'
import {FC, memo, useState} from 'react'
import {validateDatesOrder} from '../../utils/validateDatesOrder'
import {Button} from '../Button/Button'
import {Input} from '../Input/Input'

type AddTaskProps = {
    taskId: string
    taskName: string
    startDate: string
    endDate: string
    handleEditTask: (taskId: string, title: string, startDate: string, endDate: string) => void
    handleRemove: (taskId: string) => void
    setTaskToEdit: (value: null) => void

}

export const EditTask: FC<AddTaskProps> = memo((props) => {
    console.log('EditTask   render')

    const [taskName, setTaskName] = useState(props.taskName)
    const [startDate, setStartDate] = useState(props.startDate)
    const [endDate, setEndDate] = useState<string>(props.endDate)

    const handleTask = (action: 'edit' | 'delete' | 'close') => {
        if (action === 'edit') {
            if (!validateDatesOrder(startDate, endDate)) {
                alert('End date should be greater than start date')
                return
            }
            if(!taskName || !startDate || !endDate) {
                alert('Missing data, please try again')
                return
            }
            props.handleEditTask(props.taskId, taskName, startDate, endDate)
        } else if ((action === 'delete')) {
            props.handleRemove(props.taskId)
        }
        props.setTaskToEdit(null)
    }

    return (
        <div className={s.editTask}>
            <Input id="edit-task-title" labelTitle="Title" type="text" value={taskName} handleOnChange={setTaskName} placeholder='Task title'/>
            <Input id="edit-task-start-date" labelTitle="Start date" type="date" value={startDate}
                   handleOnChange={setStartDate}/>
            <Input id="edit-task-end-date" labelTitle="End date" type="date" value={endDate}
                   handleOnChange={setEndDate}/>
            <Button type="success" value="Edit" onClick={() => handleTask('edit')}/>
            <Button type="danger" value="Delete" onClick={() => handleTask('delete')}/>
            <Button type="close" value="X" onClick={() => handleTask('close')}/>
        </div>
    )
})

