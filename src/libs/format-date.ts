export const formatDate = (date: number) => {
  return new Date(date * 1000).toLocaleString('ru-RU')
}
