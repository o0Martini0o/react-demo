import React, { FC, ReactNode } from 'react'
import styles from './FormItem.module.scss'

export interface XFormItemProps {
  name: string
  label: string
  value?: unknown
  handleChange?: (name: string, value: string) => void
  children: ReactNode
}

export const FormItem: FC<FormItemProps> = (props) => {
  const { label, name, handleChange, value, children } = props
  console.log(props, 1)
  
  const onChange = (value: string) => {
    /* 通知上一次value 已经改变 */
    handleChange && handleChange(name, value)
  }
  
  return (
      <div className={styles.formItemWrap}>
        <span className={styles.formItemLabel}>
          {label} :
        </span>
        {
          React.isValidElement(children) && children.type.displayName === 'input'
              ? React.cloneElement(children, { onChange, value })
              : null
        }
      </div>
  )
}

FormItem.displayName = 'formItem'
