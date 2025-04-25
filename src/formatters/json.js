/**
 * Форматирует разницу в формате JSON
 * @param {Array} diff - Массив объектов, представляющих разницу между двумя объектами
 * @returns {string} - Строка в формате JSON
 */
export const formatDiffJson = (diff) => {
  try {
    return JSON.stringify(diff, null, 2)
  } catch (error) {
    throw new Error(`Ошибка форматирования в JSON: ${error.message}`)
  }
}
