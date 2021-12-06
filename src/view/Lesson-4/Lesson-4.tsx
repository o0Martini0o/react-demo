import React from 'react'
import { XForm } from '@/components/Form'
import { XFormItem } from '@/components/FormItem'
import { XInput } from '@/components/Input'

// TODO : complete typescript for component
export const Lesson4 = () => {
  const form = React.useRef(null)
  
  const submit = () => form.current.submitFormData((formValue) => console.log(formValue))
  const reset = () => form.current.resetFormData()
  
  return (
      <div className="box">
        <XForm ref={form}>
          <XFormItem name="name" label="我是">
            <XInput/>
          </XFormItem>
          <XFormItem name="mes" label="我想对大家说">
            <XInput/>
          </XFormItem>
          <input placeholder="不需要的input"/>
          <XInput/>
        </XForm>
        <div className="btns">
          <button className="searchbtn" onClick={submit}>提交</button>
          <button className="concellbtn" onClick={reset}>重置</button>
        </div>
      </div>
  )
}
