const variables = {}
const operators = ['+', '-', '*', '/', '%']

const stringIncludesArray = props => {
  const { array, value } = props
  let result
  for (const key in array) {
    const item = array[key]
    if (!result && value.includes(item)) {
      result = item
    }
  }
  return result
}

const lineHasOperator = props => {
  const { value, operator } = props

  let lineResult

  const splitValue = value.split(operator)
  const firstValue = splitValue[0]
  const secondValue = splitValue[1]
  const firstVariable = /^\d+$/.test(firstValue)
    ? parseFloat(firstValue)
    : parseFloat(variables[firstValue])
  const secondVariable = /^\d+$/.test(secondValue)
    ? parseFloat(secondValue)
    : parseFloat(variables[secondValue])

  if (operator === '+') {
    lineResult = firstVariable + secondVariable
  } else if (operator === '-') {
    lineResult = firstVariable - secondVariable
  } else if (operator === '*') {
    lineResult = firstVariable * secondVariable
  } else if (operator === '/') {
    lineResult = firstVariable / secondVariable
  } else if (operator === '%') {
    lineResult = firstVariable % secondVariable
  }

  return lineResult
}

const stringMath = value => {
  const operator = stringIncludesArray({ array: operators, value })

  const lineResult = operator ? lineHasOperator({ value, operator }) : value

  return lineResult
}

const lineHasEquals = props => {
  const { splitEqualSigns } = props

  const variable = splitEqualSigns[0]
  const value = splitEqualSigns[1]

  const operator = stringIncludesArray({ array: operators, value })

  const lineResult = operator ? lineHasOperator({ value, operator }) : value

  variables[variable] = lineResult

  return lineResult
}

const calculate = input => {
  const lineResults = []

  const lines = input.split('\n')

  for (const key in lines) {
    let lineResult = ''

    const line = lines[key].replace(/\s+/g, '')
    const splitEqualSigns = line.split('=')
    const equalSignLength = splitEqualSigns.length - 1

    if (equalSignLength === 1) {
      lineResult = lineHasEquals({ splitEqualSigns })
    } else {
      lineResult = stringMath(line)
    }

    lineResults.push(lineResult)
  }

  const result = lineResults.join('\n')

  return result
}

module.exports = calculate
