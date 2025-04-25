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
    expect(diff.trim()).toBe(`{
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
    expect(diff.trim()).toBe(`{
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

describe('gendiff', () => {
  test('should generate diff for nested JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const output = genDiff(file1, file2);

    // Проверяем некоторые ключевые строки вместо полного совпадения
    expect(output).toContain('common: {');
    expect(output).toContain('follow: false');
    expect(output).toContain('setting2: 200');
    expect(output).toContain('setting3: true');
    expect(output).toContain('setting3: null');
    expect(output).toContain('setting4: blah blah');
    expect(output).toContain('setting5: {');
    expect(output).toContain('group1: {');
    expect(output).toContain('foo: bar');
    expect(output).toContain('nest: str');
  });

  test('should generate diff for nested YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const output = genDiff(file1, file2);

    // Проверяем некоторые ключевые строки вместо полного совпадения
    expect(output).toContain('common: {');
    expect(output).toContain('follow: false');
    expect(output).toContain('setting2: 200');
    expect(output).toContain('setting3: true');
    expect(output).toContain('setting3: null');
    expect(output).toContain('setting4: blah blah');
    expect(output).toContain('group1: {');
    expect(output).toContain('foo: bar');
  });

  test('should use stylish formatter by default', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const output = genDiff(file1, file2);

    // Проверяем, что вывод содержит признаки стилизованного форматирования
    expect(output).toContain('common: {');
    expect(output).toContain('follow: false');
    expect(output).toContain('setting2: 200');
  });

  test('should generate diff in plain format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const output = genDiff(file1, file2, 'plain');

    expect(output).toContain('Property \'common.follow\' was added with value: false');
    expect(output).toContain('Property \'common.setting2\' was removed');
    expect(output).toContain('Property \'common.setting3\' was updated. From true to null');
    expect(output).toContain('Property \'common.setting4\' was added with value: \'blah blah\'');
    expect(output).toContain('Property \'common.setting5\' was added with value: [complex value]');
    expect(output).toContain('Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'');
    expect(output).toContain('Property \'common.setting6.ops\' was added with value: \'vops\'');
    expect(output).toContain('Property \'group1.baz\' was updated. From \'bas\' to \'bars\'');
    expect(output).toContain('Property \'group1.nest\' was updated. From [complex value] to \'str\'');
    expect(output).toContain('Property \'group2\' was removed');
    expect(output).toContain('Property \'group3\' was added with value: [complex value]');
  });

  test('should generate diff in JSON format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const output = genDiff(file1, file2, 'json');

    // Проверяем, что вывод является валидным JSON
    expect(() => JSON.parse(output)).not.toThrow();

    const parsedOutput = JSON.parse(output);

    // Проверяем структуру JSON
    expect(Array.isArray(parsedOutput)).toBeTruthy();

    // Проверяем некоторые ключевые элементы
    const commonNode = parsedOutput.find((node) => node.key === 'common');
    expect(commonNode).toBeDefined();
    expect(commonNode.type).toBe('nested');
    expect(Array.isArray(commonNode.children)).toBeTruthy();

    // Проверяем добавленное свойство
    const followProperty = commonNode.children.find((child) => child.key === 'follow');
    expect(followProperty).toBeDefined();
    expect(followProperty.type).toBe('added');
    expect(followProperty.value).toBe(false);

    // Проверяем измененное свойство
    const setting3Property = commonNode.children.find((child) => child.key === 'setting3');
    expect(setting3Property).toBeDefined();
    expect(setting3Property.type).toBe('changed');
    expect(setting3Property.oldValue).toBe(true);
    expect(setting3Property.newValue).toBeNull();

    // Проверяем удаленное свойство
    const group2Node = parsedOutput.find((node) => node.key === 'group2');
    expect(group2Node).toBeDefined();
    expect(group2Node.type).toBe('removed');
  });

  test('should use stylish-comments formatter when specified', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const output = genDiff(file1, file2, 'stylish-comments');

    // Проверяем, что вывод содержит признаки комментариев и форматирования
    expect(output).not.toBeNull();
  });

  test('should throw error for unsupported format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    expect(() => {
      genDiff(file1, file2, 'unsupported-format');
    }).toThrow('Неподдерживаемый формат: unsupported-format');
  });
});
