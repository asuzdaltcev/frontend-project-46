import { parseFile } from './parsers.js'
import formatter from './formatters/index.js'

const buildDiff = (obj1, obj2) => {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  const sortedKeys = Array.from(keys).sort()

  return sortedKeys.map(key => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!(key in obj1)) {
      return { key, type: 'added', value: value2 }
    }
    if (!(key in obj2)) {
      return {
        key, type: 'removed', value: value1, oldValue: value1,
      }
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 }
    }
    if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
      return { key, type: 'nested', children: buildDiff(value1, value2) }
    }
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    }
  })
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)
  const diff = buildDiff(obj1, obj2)

  return formatter(diff, format)
}

export { genDiff }
export default genDiff
