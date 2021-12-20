import { formatDate } from './format-date'

test('should format a timestamp', () => {
  expect(formatDate(1530349200)).toBe('30.06.2018, 12:00:00')
  expect(formatDate(1609448400)).toBe('01.01.2021, 00:00:00')
})
