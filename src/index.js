import { parseFile } from './parsers.js';

export const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  // Пока просто возвращаем объекты для проверки
  return { data1, data2 };
};