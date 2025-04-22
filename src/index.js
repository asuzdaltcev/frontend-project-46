import { parseFile } from './parsers.js';

const compareObjects = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = [...new Set([...keys1, ...keys2])].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const diff = allKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    return {
      key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });

  return diff;
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `    ${item.key}: ${item.value}`;
      case 'removed':
        return `  - ${item.key}: ${item.value}`;
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      case 'changed':
        return `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}`;
      default:
        return '';
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

export const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = compareObjects(data1, data2);
  return formatDiff(diff);
};
