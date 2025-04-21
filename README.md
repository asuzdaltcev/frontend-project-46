# Вычислитель отличий

[![Actions Status](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions)
[![Node CI](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/tests.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/tests.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/YOUR_REPO_ID/maintainability)](https://codeclimate.com/github/asuzdaltcev/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/YOUR_REPO_ID/test_coverage)](https://codeclimate.com/github/asuzdaltcev/frontend-project-46/test_coverage)

## Описание

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярный алгоритм, применяющийся, например, при выводе разницы двух файлов, или при отслеживании изменений в документах.

## Установка

```bash
npm install
```

## Использование

```bash
gendiff filepath1.json filepath2.json
```

## Пример работы

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