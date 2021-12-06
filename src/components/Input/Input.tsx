import { FC } from 'react'

export interface XInputProps {
  value: string
  onChange: (str: string) => void
}

export const Input: FC<XInputProps> = ({ onChange, value }) => {
  return <input className="input" onChange={(e) => (onChange && onChange(e.target.value))} value={value}/>
}

Input.displayName = 'input'
