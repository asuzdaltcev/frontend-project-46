import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath);

  if (extension === '.json') {
    return JSON.parse(content);
  }

  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(content);
  }

  throw new Error(`Неподдерживаемый формат файла: ${extension}`);
};
