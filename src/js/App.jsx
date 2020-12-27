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

const App = () => {
  const defaultInput = '<div>first = 9</div><div>second = 7</div><div>add = first + second</div><div>multiply = first * second</div><div><br></div><div>first - second</div>'

  const [output, setOutput] = useState()

  useEffect(() => {
    const input = sanitize(defaultInput)
    const output = calculate(input)
    setOutput(output)
  }, [])

  const inputOnChange = e => {
    const input = sanitize(e.target.innerHTML)
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
        dangerouslySetInnerHTML={{ __html: defaultInput }}
      />
      <div id='line' />
      <div id='output'>{output}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
