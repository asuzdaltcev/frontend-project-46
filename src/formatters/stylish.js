const spacesCount = 4;
const getIndent = (depth, sign = ' ') => `${' '.repeat(depth * spacesCount - 2)}${sign} `;

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );

  return ['{', ...lines, `${getIndent(depth)} }`].join('\n');
};

const formatDiff = (diff, depth = 1) => {
  const lines = diff.flatMap((node) => {
    const {
      type, key, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'nested':
        return `${getIndent(depth)}${key}: {\n${formatDiff(children, depth + 1)}\n${getIndent(depth)} }`;
      case 'unchanged':
        return `${getIndent(depth)}${key}: ${stringify(value, depth)}`;
      case 'added':
        return `${getIndent(depth, '+')}${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${getIndent(depth, '-')}${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${getIndent(depth, '-')}${key}: ${stringify(oldValue, depth)}`,
          `${getIndent(depth, '+')}${key}: ${stringify(newValue, depth)}`,
        ];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

const stylish = (diff) => `{\n${formatDiff(diff)}\n}`;

export default stylish;
