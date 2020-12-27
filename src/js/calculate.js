const variables = {}

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

const operators = ['+', '-', '*', '/', '%']

const lineHasOperator = props => {
  const { variableValue, operatorInVariableValue } = props

  let lineResult

  const splitVariableValue = variableValue.split(operatorInVariableValue)
  const firstVariable = parseInt(variables[splitVariableValue[0]])
  const secondVariable = parseInt(variables[splitVariableValue[1]])

  if (operatorInVariableValue === '+') {
    lineResult = firstVariable + secondVariable
  } else if (operatorInVariableValue === '-') {
    lineResult = firstVariable - secondVariable
  } else if (operatorInVariableValue === '*') {
    lineResult = firstVariable * secondVariable
  } else if (operatorInVariableValue === '/') {
    lineResult = firstVariable / secondVariable
  } else if (operatorInVariableValue === '%') {
    lineResult = firstVariable % secondVariable
  }

  return lineResult
}

const lineHasEquals = props => {
  const { splitEqualSigns } = props

  let lineResult

  const variable = splitEqualSigns[0]
  const variableValue = splitEqualSigns[1]
  variables[variable] = variableValue

  const operatorInVariableValue = stringIncludesArray({ array: operators, value: variableValue })

  if (operatorInVariableValue) {
    lineResult = lineHasOperator({ variableValue, operatorInVariableValue })
  } else {
    lineResult = variableValue
  }

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
      lineResult = line
    }

    lineResults.push(lineResult)
  }

  const result = lineResults.join('\n')

  return result
}

module.exports = calculate
