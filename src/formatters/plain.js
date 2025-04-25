const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object' && value !== null) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return value
}

const formatNode = (node, path = '') => {
  const {
    key,
    type,
    value,
    oldValue,
    newValue,
    children,
  } = node
  const currentPath = path ? `${path}.${key}` : key

  switch (type) {
    case 'nested':
      return children.map(child => formatNode(child, currentPath)).filter(Boolean).join('\n')
    case 'unchanged':
      return ''
    case 'added':
      return `Property '${currentPath}' was added with value: ${formatValue(value)}`
    case 'removed':
      return `Property '${currentPath}' was removed`
    case 'changed':
      return `Property '${currentPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`
    default:
      return ''
  }
}

export const formatDiffPlain = (diff) => {
  const lines = diff.map(node => formatNode(node)).filter(Boolean)
  return lines.join('\n')
}
