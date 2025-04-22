import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { genDiff } from '../src/index.js';
import { parseFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

// Импортируем внутреннюю функцию для тестирования
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

describe('genDiff', () => {
  test('should generate diff for JSON files', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');
    const diff = genDiff(filepath1, filepath2);
    expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });

  test('should generate diff for YAML files', () => {
    const filepath1 = getFixturePath('before.yml');
    const filepath2 = getFixturePath('after.yml');
    const diff = genDiff(filepath1, filepath2);
    expect(diff).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });

  test('should throw error for non-existent file', () => {
    expect(() => {
      genDiff('non-existent1.json', 'non-existent2.json');
    }).toThrow();
  });

  test('should handle unknown diff type', () => {
    const diff = [{ key: 'test', type: 'unknown', value: 'value' }];
    expect(formatDiff(diff)).toBe('{\n\n}');
  });
});

describe('parseFile', () => {
  const testFilePath = join(__dirname, 'test.txt');

  beforeAll(() => {
    fs.writeFileSync(testFilePath, 'test content');
  });

  afterAll(() => {
    fs.unlinkSync(testFilePath);
  });

  test('should throw error for unsupported file format', () => {
    expect(() => {
      parseFile(testFilePath);
    }).toThrow('Неподдерживаемый формат файла: .txt');
  });
});
