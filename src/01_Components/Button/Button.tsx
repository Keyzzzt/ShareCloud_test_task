import s from './button.module.scss'
import {FC, memo} from 'react'

type ButtonProps = {
    type: 'success' | 'danger' | 'close'
    value: string
    onClick: any
}

export const Button: FC<ButtonProps> = memo(({type, value, onClick}) => {
    console.log('Button   render')
    const className = type === 'success'
        ? s.success
        : type === 'danger'
            ? s.danger
            : s.close
    return (
        <input onClick={onClick} className={className} type="button" value={value}/>
    )
})
