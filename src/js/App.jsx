import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'
import calculate from './calculate'

const App = () => {
  const defaultInput = 'first = 5\nsecond = 6\nadd = first + second\nmultiply = first * second\n'

  const [output, setOutput] = useState()

  useEffect(() => {
    const output = calculate(defaultInput)
    setOutput(output)
  }, [])

  const inputOnChange = (e) => {
    const input = e.target.textContent
    const output = calculate(input)
    setOutput(output)
  }

  return (
    <div id='app'>
      <div
        id='input'
        contentEditable
        onInput={inputOnChange}
        suppressContentEditableWarning
      >
        {defaultInput}
      </div>
      <div id='line' />
      <div id='output'>{output}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
