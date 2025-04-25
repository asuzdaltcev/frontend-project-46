const INDENT_SIZE = 4
const INDENT_REPLACER = ' '

const getIndent = (depth, replacer = INDENT_REPLACER) => replacer.repeat(depth * INDENT_SIZE)

const formatValue = (value, depth = 0) => {
  if (value === null) return 'null'
  if (value === '') return '\'\''
  if (typeof value === 'object' && value !== null) {
    const indentForKey = getIndent(depth)
    const indentForBracket = getIndent(depth - 1)
    const entries = Object.entries(value)
    const lines = entries.map(([key, val]) => `${indentForKey}${key}: ${formatValue(val, depth + 1)}`)
    return [
      '{',
      ...lines,
      `${indentForBracket}}`,
    ].join('\n')
  }
  return String(value)
}

const getComment = (type, isOldValue) => {
  switch (type) {
    case 'added':
      return '# Добавлена'
    case 'removed':
      return '# Удалена'
    case 'changed':
      return isOldValue ? '# Старое значение' : '# Новое значение'
    default:
      return ''
  }
}

const formatNode = (node, formatNestedFn, depth = 1) => {
  const indentForKey = getIndent(depth)
  const indentForSign = getIndent(depth).slice(0, -2)
  const bracketIndent = getIndent(depth - 1)
  
  const {
    key, type, value, value1, value2, children,
  } = node

  switch (type) {
    case 'nested':
      return `${indentForKey}${key}: {\n${formatNestedFn(children, depth + 1)}\n${bracketIndent}}`
    case 'unchanged':
      return `${indentForKey}${key}: ${formatValue(value, depth + 1)}`
    case 'added':
      return `${indentForSign}+ ${key}: ${formatValue(value, depth + 1)} ${getComment('added')}`
    case 'removed':
      return `${indentForSign}- ${key}: ${formatValue(value, depth + 1)} ${getComment('removed')}`
    case 'changed':
      return [
        `${indentForSign}- ${key}: ${formatValue(value1, depth + 1)} ${getComment('changed', true)}`,
        `${indentForSign}+ ${key}: ${formatValue(value2, depth + 1)} ${getComment('changed', false)}`,
      ].join('\n')
    default:
      return ''
  }
}

const formatStylish = (diff, depth = 1) => {
  const formatFn = (children, newDepth) => formatStylish(children, newDepth)
  const lines = diff.map(node => formatNode(node, formatFn, depth))
  return lines.join('\n')
}

export const formatDiffStylishWithComments = diff => `{\n${formatStylish(diff)}\n}`
