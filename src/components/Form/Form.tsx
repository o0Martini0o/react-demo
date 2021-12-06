import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'

type FormProps = {
  submitFormData: FormSubmit
  resetFormData: FormReset
}

type FormSubmit = (cb: Function) => void

type FormReset = () => void

export const Form = forwardRef<FormProps>((props, ref) => {
  
  const [formData, setFormData] = useState<{ [key: string]: unknown }>({})
  
  const resetFormData: FormReset = () => {
    Object.keys(formData).forEach((item: string) => formData[item] = '')
    setFormData({ ...formData })
  }
  
  const submitFormData: FormSubmit = cb => cb(formData)
  
  const setValue = (name: string, value: string) => setFormData({ ...formData, ...{ [name]: value } })
  
  useImperativeHandle(ref, () => {
    return {
      submitFormData,
      resetFormData,
    }
  })
  
  const renderChildren: ReactElement[] = []
  
  const { children } = props
  children.forEach((child: ReactElement) => {
    console.log(child)
    if (child.type.displayName === 'formItem') {
      const { name } = child.props
      /* 克隆`FormItem`节点，混入改变表单单元项的方法 */
      const Children = React.cloneElement(child, {
        key: name,                   /* 加入key 提升渲染效果 */
        handleChange: setValue,      /* 用于改变 value */
        value: formData[name] || ''  /* value 值 */
      }, child.props.children)
      renderChildren.push(Children)
    }
  })
  
  return (
      <>
        {renderChildren}
      </>
  )
})

//export class Form extends React.Component{
//  state={
//    formData:{}
//  }
//  /* 用于提交表单数据 */
//  submitForm=(cb)=>{
//    cb({ ...this.state.formData })
//  }
//  /* 获取重置表单数据 */
//  resetForm=()=>{
//    const { formData } = this.state
//    Object.keys(formData).forEach(item=>{
//      formData[item] = ''
//    })
//    this.setState({
//      formData
//    })
//  }
//  /* 设置表单数据层 */
//  setValue=(name,value)=>{
//    this.setState({
//      formData:{
//        ...this.state.formData,
//        [name]:value
//      }
//    })
//  }
//  render(){
//    const { children } = this.props
//    const renderChildren = []
//    React.Children.forEach(children,(child)=>{
//      if(child.type.displayName === 'formItem'){
//        const { name } = child.props
//        /* 克隆`FormItem`节点，混入改变表单单元项的方法 */
//        const Children = React.cloneElement(child,{
//          key:name ,                             /* 加入key 提升渲染效果 */
//          handleChange:this.setValue ,           /* 用于改变 value */
//          value:this.state.formData[name] ||  '' /* value 值 */
//        },child.props.children)
//        renderChildren.push(Children)
//      }
//    })
//    return renderChildren
//  }
//}

Form.displayName = 'form'
