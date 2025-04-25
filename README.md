# Вычислитель отличий

[![Actions Status](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions)
[![Node CI](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/tests.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/tests.yml)
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)

## Описание

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярный алгоритм, применяющийся, например, при выводе разницы двух файлов, или при отслеживании изменений в документах.

## Установка

```bash
make install
```

## Использование

```bash
gendiff filepath1.json filepath2.json
# или
gendiff filepath1.yml filepath2.yml
```

## Разработка

```bash
# Запуск линтера
make lint

# Запуск тестов
make test

# Запуск тестов в режиме watch
make test-watch

# Запуск тестов с покрытием
make test-coverage
```

## Пример работы

### Сравнение JSON файлов

```bash
$ gendiff __fixtures__/before.json __fixtures__/after.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### Сравнение YAML файлов

```bash
$ gendiff __fixtures__/before.yml __fixtures__/after.yml
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

[![asciicast](https://asciinema.org/a/GPUx8u8X5CkcZev2MCddWJPW3.svg)](https://asciinema.org/a/GPUx8u8X5CkcZev2MCddWJPW3)

### Рекурсивное сравнение

CLI utility for finding differences between configuration files. Supports JSON and YAML formats.

## Installation

```bash
npm install
```

## Usage

```bash
gendiff <filepath1> <filepath2>
```

### Example

```bash
$ gendiff file1.json file2.json
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
          key5: value5
        }
        setting6: {
          doge: {
          -   wow: ''
          +   wow: 'so much'
          }
        +   ops: vops
        }
    }
    group1: {
        baz: {
        -   bas
        +   bars
        }
        foo: bar
      - nest: {
        -     key: value
        -   }
      + nest: str
    }
  - group2: {
  -     abc: 12345
  -     deep: {
  -       id: 45
  -     }
  -   }
  + group3: {
  +     deep: {
  +       id: {
  +         number: 45
  +       }
  +     }
  +     fee: 100500
  +   }
}
```

## Features

- Support for JSON and YAML formats
- Comparison of nested structures
- Stylish output format (default)
- Support for different value types (strings, numbers, booleans, null, objects)

[![asciicast](https://asciinema.org/a/hTXWYXRXfhFpqXYUJoOViG8xY.svg)](https://asciinema.org/a/hTXWYXRXfhFpqXYUJoOViG8xY)