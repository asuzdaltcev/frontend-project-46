const formatValue = (value, depth = 0) => {
  const indent = ' '.repeat(depth * 2);

  if (value === null) return 'null';
  if (value === '') return "''";
  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value);
    const lines = entries.map(([key, val]) => `${indent}    ${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${indent}}`;
  }
  return String(value);
};

const getComment = (type, isOldValue) => {
  switch (type) {
    case 'added':
      return '# Добавлена';
    case 'removed':
      return '# Удалена';
    case 'changed':
      return isOldValue ? '# Старое значение' : '# Новое значение';
    default:
      return '';
  }
};

// Forward declaration
let formatStylish;

const formatNode = (node, depth = 0) => {
  const indent = ' '.repeat(depth * 2);
  const {
    key, type, value, value1, value2, children,
  } = node;

  switch (type) {
    case 'nested':
      return `${indent}    ${key}: {\n${formatStylish(children, depth + 1)}\n${indent}    }`;
    case 'unchanged':
      return `${indent}    ${key}: ${formatValue(value, depth)}`;
    case 'added':
      return `${indent}  + ${key}: ${formatValue(value, depth)} ${getComment('added')}`;
    case 'removed':
      return `${indent}  - ${key}: ${formatValue(value, depth)} ${getComment('removed')}`;
    case 'changed':
      return `${indent}  - ${key}: ${formatValue(value1, depth)} ${getComment('changed', true)}\n${indent}  + ${key}: ${formatValue(value2, depth)} ${getComment('changed', false)}`;
    default:
      return '';
  }
};

// Затем определяем formatStylish
formatStylish = (diff, depth = 0) => {
  const lines = diff.map((node) => formatNode(node, depth));
  return lines.join('\n');
};

export const formatDiffStylishWithComments = (diff) => `{\n${formatStylish(diff)}\n}`;
