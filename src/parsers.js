import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = filepath => (
    path.isAbsolute(filepath)
        ? filepath
        : path.resolve(process.cwd(), filepath)
)

const getFixturesPath = filepath => (
    path.resolve(process.cwd(), '__fixtures__', path.basename(filepath))
)

const getValidPath = (filepath) => {
    const initialPath = getAbsolutePath(filepath)

    if (fs.existsSync(initialPath)) {
        return initialPath
    }

    const fixturesPath = getFixturesPath(filepath)
    if (fs.existsSync(fixturesPath)) {
        return fixturesPath
    }

    throw new Error(`Файл не найден: ${filepath}`)
}

const parseContent = (content, extension) => {
    if (extension === '.json') {
        return JSON.parse(content)
    }

    if (extension === '.yml' || extension === '.yaml') {
        return yaml.load(content)
    }

    throw new Error(`Неподдерживаемый формат файла: ${extension}`)
}

export const parseFile = (filepath) => {
    const validPath = getValidPath(filepath)
    const content = fs.readFileSync(validPath, 'utf-8')
    const extension = path.extname(filepath).toLowerCase()

    return parseContent(content, extension)
}
