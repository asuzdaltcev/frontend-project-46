import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const parseFile = (filepath) => {
  // Преобразуем путь в абсолютный, если он относительный
  let absolutePath;
  if (path.isAbsolute(filepath)) {
    absolutePath = filepath;
  } else {
    // Используем текущую рабочую директорию для относительных путей
    absolutePath = path.resolve(process.cwd(), filepath);
  }

  // Проверяем существование файла
  if (!fs.existsSync(absolutePath)) {
    // Если файл не найден, пробуем искать в директории __fixtures__
    const fixturesPath = path.resolve(process.cwd(), '__fixtures__', path.basename(filepath));
    if (fs.existsSync(fixturesPath)) {
      absolutePath = fixturesPath;
    } else {
      throw new Error(`Файл не найден: ${filepath}`);
    }
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();

  if (extension === '.json') {
    return JSON.parse(content);
  }

  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(content);
  }

  throw new Error(`Неподдерживаемый формат файла: ${extension}`);
};
