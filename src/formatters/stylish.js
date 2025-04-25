const INDENT_SIZE = 4
const INDENT_REPLACER = ' '

const getIndent = (depth, replacer = INDENT_REPLACER) => replacer.repeat(depth * INDENT_SIZE)

const stringify = (value, depth) => {
  if (value === null) return 'null'
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const indentForKey = getIndent(depth)
  const indentForBracket = getIndent(depth - 1)
  const lines = Object.entries(value).map(
    ([key, val]) => `${indentForKey}${key}: ${stringify(val, depth + 1)}`,
  )

  return [
    '{',
    ...lines,
    `${indentForBracket}}`,
  ].join('\n')
}

const formatDiff = (diff, depth = 1) => {
  const indentForKey = getIndent(depth)
  const indentForSign = getIndent(depth).slice(0, -2)

  const result = diff.flatMap((node) => {
    const { type, key, value, oldValue, newValue, children } = node

    switch (type) {
      case 'nested': {
        return `${indentForKey}${key}: {\n${formatDiff(children, depth + 1)}\n${indentForKey}}`
      }
      case 'unchanged':
        return `${indentForKey}${key}: ${stringify(value, depth + 1)}`
      case 'added':
        return `${indentForSign}+ ${key}: ${stringify(value, depth + 1)}`
      case 'removed':
        return `${indentForSign}- ${key}: ${stringify(value, depth + 1)}`
      case 'changed':
        return [
          `${indentForSign}- ${key}: ${stringify(oldValue, depth + 1)}`,
          `${indentForSign}+ ${key}: ${stringify(newValue, depth + 1)}`,
        ]
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return result.join('\n')
}

const stylish = diff => `{\n${formatDiff(diff)}\n}`

export default stylish
