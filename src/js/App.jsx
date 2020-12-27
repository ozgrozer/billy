import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'
import calculate from './calculate'

const sanitize = input => {
  const div = document.createElement('div')
  div.innerHTML = input.replace(/<\/div>/g, '</div>\n')
  const text = div.textContent || div.innerText || ''
  return text
}

const writeCookie = props => {
  const theDate = new Date()
  const oneYearLater = new Date(theDate.getTime() + 31536000000)
  const expiryDate = oneYearLater.toGMTString()
  const value = window.btoa(props.value)
  document.cookie = props.key + '=' + value + '; expires=' + expiryDate + '; path=/'
}

const readCookie = props => {
  const getCookie = document.cookie.match('(^|;)\\s*' + props.key + '\\s*=\\s*([^;]+)')

  if (getCookie) {
    const lastItem = getCookie.pop()
    return props.boolean ? lastItem === 'true' : window.atob(lastItem)
  } else if (props.defaultValue !== undefined) {
    return props.defaultValue
  }
}

const App = () => {
  const defaultValue = '<div>first = 9</div><div>second = 7</div><div>add = first + second</div><div>multiply = first * second</div><div><br></div><div>first - second</div>'
  const defaultInput = readCookie({ key: 'input', defaultValue })
  const input = sanitize(defaultInput)
  const defaultOutput = calculate(input)

  const [output, setOutput] = useState(defaultOutput)

  const inputOnChange = e => {
    const input = sanitize(e.target.innerHTML)
    const output = calculate(input)
    writeCookie({ key: 'input', value: input })
    setOutput(output)
  }

  return (
    <div id='app'>
      <div
        id='input'
        contentEditable
        onInput={inputOnChange}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: defaultInput }}
      />
      <div id='line' />
      <div id='output'>{output}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
