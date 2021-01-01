import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'
import calculate from './calculate'

const sanitize = input => {
  const div = document.createElement('div')
  div.innerHTML = input.replace(/<\/div>/g, '</div>\n')
  const text = div.textContent || div.innerText || ''
  return text
}

const App = () => {
  const localStorageInput = window.localStorage.getItem('input')
  const _defaultInput = '<div>first = 80</div><div>second = 40</div><div><br></div><div>add = first + second</div><div>subtract = first - second</div><div>multiply = first * second</div><div><br></div><div>first / second</div><div>first % second</div>'
  const defaultInput = localStorageInput || _defaultInput
  const input = sanitize(defaultInput)
  const defaultOutput = calculate(input)

  const [output, setOutput] = useState(defaultOutput)

  const inputOnChange = e => {
    const input = sanitize(e.target.value)
    const output = calculate(input)
    setOutput(output)
    window.localStorage.setItem('input', input)
  }

  return (
    <div id='app'>
      <textarea
        id='input'
        value={defaultInput}
        onChange={inputOnChange}
      />
      <div id='line' />
      <div id='output'>{output}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
