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

const calculate = input => {
  const operators = ['+', '-', '*', '/', '%']

  const lineResults = []

  const lines = input.split('\n')

  for (const key in lines) {
    let lineResult = ''

    const line = lines[key].replace(/\s+/g, '')
    const splitEqualSigns = line.split('=')
    const equalSignLength = splitEqualSigns.length - 1

    if (equalSignLength === 1) {
      const variable = splitEqualSigns[0]
      const value = splitEqualSigns[1]
      variables[variable] = value

      const lineHasOperator = stringIncludesArray({ array: operators, value })

      if (lineHasOperator) {
        const splitValue = value.split(lineHasOperator)
        const firstVariable = parseInt(variables[splitValue[0]])
        const secondVariable = parseInt(variables[splitValue[1]])

        if (lineHasOperator === '+') {
          lineResult = firstVariable + secondVariable
        } else if (lineHasOperator === '-') {
          lineResult = firstVariable - secondVariable
        } else if (lineHasOperator === '*') {
          lineResult = firstVariable * secondVariable
        } else if (lineHasOperator === '/') {
          lineResult = firstVariable / secondVariable
        } else if (lineHasOperator === '%') {
          lineResult = firstVariable % secondVariable
        }
      } else {
        lineResult = value
      }
    } else {
      lineResult = line
    }

    lineResults.push(lineResult)
  }

  const result = lineResults.join('\n')

  return result
}

module.exports = calculate
