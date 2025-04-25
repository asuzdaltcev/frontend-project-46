import stylish from './stylish.js';
import { formatDiffStylishWithComments } from './stylishWithComments.js';
import { formatDiffPlain } from './plain.js';
import { formatDiffJson } from './json.js';

export default (diff, format = 'stylish') => {
  switch (format) {
  case 'stylish':
    return stylish(diff);
  case 'stylish-comments':
    return formatDiffStylishWithComments(diff);
  case 'plain':
    return formatDiffPlain(diff);
  case 'json':
    return formatDiffJson(diff);
  default:
    throw new Error(`Неподдерживаемый формат: ${format}`);
  }
};
