# Вычислитель отличий

[![Actions Status](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions)
[![Node.js CI](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/nodejs.yml)
[![SonarQube Analysis](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/sonar.yml/badge.svg)](https://github.com/asuzdaltcev/frontend-project-46/actions/workflows/sonar.yml)
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=asuzdaltcev_frontend-project-46&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=asuzdaltcev_frontend-project-46)

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