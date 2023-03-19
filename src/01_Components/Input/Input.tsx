import s from './button.module.scss'
import {FC, memo} from 'react'

type ButtonProps = {
    id: string
    labelTitle: string
    type: 'text' | 'date'
    value: string
    handleOnChange: (value: string) => void
    placeholder?:string

}

export const Input: FC<ButtonProps> = memo(({id, labelTitle, type, value, handleOnChange, placeholder}) => {
    console.log('Input   render')
    return (
        <>
            <label htmlFor={id}>{labelTitle}</label>
            <input onChange={(e) => handleOnChange(e.currentTarget.value)} type={type} value={value} id={id} placeholder={placeholder}/>
        </>
    )
})
