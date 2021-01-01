import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'
import calculate from './calculate'

const App = () => {
  const localStorageInput = window.localStorage.getItem('input')
  const _defaultInput = 'first = 80\nsecond = 40\n\nadd = first + second\nsubtract = first - second\nmultiply = first * second\n\nfirst + 20\n\nfirst / second\nfirst % second\n'
  const defaultInput = localStorageInput || _defaultInput
  const defaultOutput = calculate(defaultInput)

  const [input, setInput] = useState(defaultInput)
  const [output, setOutput] = useState(defaultOutput)

  const inputOnChange = e => {
    const input = e.target.value
    const output = calculate(input)
    setInput(input)
    setOutput(output)
    window.localStorage.setItem('input', input)
  }

  return (
    <div id='app'>
      <textarea
        id='input'
        value={input}
        onChange={inputOnChange}
      />
      <div id='line' />
      <div id='output'>{output}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
