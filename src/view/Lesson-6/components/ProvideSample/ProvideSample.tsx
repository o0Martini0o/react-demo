import React, { useContext, FC, Dispatch, SetStateAction } from 'react'

import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'

interface ThemeContextProps {
  color?: string
  background?: string
  type?: 'dark' | 'light'
  border?: string
  setTheme?: Dispatch<SetStateAction<ThemeItem>>
}

type Theme = Record<'dark' | 'light', ThemeItem>

interface ThemeItem {
  color?: string
  background?: string
  type?: 'dark' | 'light'
  border?: string
}

// 主题颜色Context
const ThemeContext = React.createContext<ThemeContextProps>({} as ThemeContextProps)

//主题颜色
const theme: Theme = {
  dark: { color: '#1890ff', background: '#1890ff', border: '1px solid blue', type: 'dark', },
  light: { color: '#fc4838', background: '#fc4838', border: '1px solid pink', type: 'light' }
}

export const ProvideSample = () => {
  const [themeContextValue, setThemeContext] = React.useState<ThemeItem>(theme.dark)
  /* 传递颜色主题 和 改变主题的方法 */
  return (
      <ThemeContext.Provider value={{ ...themeContextValue, setTheme: setThemeContext }}>
        <App/>
      </ThemeContext.Provider>
  )
}

interface InputProps {
  label: string
  placeholder: string
}

// contextType 模式
class App extends React.PureComponent {
  static contextType = ThemeContext
  render() {
    const { border, setTheme, color, background } = this.context
    return <div className="context_app" style={{ border, color }}>
      <div className="context_change_theme">
        <span> 选择主题： </span>
        <Checkbox label="light" name="light" onChange={() => setTheme(theme.light)}/>
        <Checkbox label="dark" name="dark" onChange={() => setTheme(theme.dark)}/>
      </div>
      <div className="box_content">
        <Box>
          <Input label="姓名：" placeholder="请输入姓名"/>
          <Input label="age：" placeholder="请输入年龄"/>
          <button className="searchbtn" style={{ background }}>确定</button>
          <button className="concellbtn" style={{ color }}>取消</button>
        </Box>
        <Box>
          <ArrowCircleDownOutlinedIcon color={color}/>
          <ArrowCircleLeftOutlinedIcon color={color}/>
          <ArrowCircleRightOutlinedIcon color={color}/>
          <ArrowCircleUpOutlinedIcon color={color}/>
        </Box>
        <Box>
          <div className="person_des" style={{ color: '#fff', background }}>
            I am alien <br/>
            let us learn React!
          </div>
        </Box>
      </div>
    </div>
  }
}

/* input输入框 - useContext 模式 */
const Input: FC<InputProps> = (props) => {
  const { color, border } = useContext<ThemeContextProps>(ThemeContext)
  const { label, placeholder } = props
  return <div>
    <label style={{ color }}>{label}</label>
    <input className="input" placeholder={placeholder} style={{ border }}/>
  </div>
}
/* 容器组件 -  Consumer模式 */
const Box: FC<ThemeContextProps> = (props) => {
  return (
      <ThemeContext.Consumer>
        {(themeContextValue) => {
          const { border, color } = themeContextValue
          return <div className="context_box" style={{ border, color }}>
            {props.children}
          </div>
        }}
      </ThemeContext.Consumer>
  )
}

interface CheckboxProps {
  label: string
  name: string
  onChange: () => void
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { label, name, onChange } = props
  const { type, color } = React.useContext(ThemeContext)
  return (
      <div className="checkbox" onClick={onChange}>
        <label htmlFor="name"> {label} </label>
        <input
            checked={type === name}
            id={name}
            name={name}
            onChange={() => {}}
            style={{ color }}
            type="checkbox"
            value={type}
        />
      </div>
  )
}
