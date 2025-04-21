import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
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
