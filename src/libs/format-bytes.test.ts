import { formatBytes } from './format-bytes'

test('should format a number', () => {
  expect(formatBytes(0)).toBe('0 Bytes')
  expect(formatBytes(1)).toBe('1 Bytes')
  expect(formatBytes(1023)).toBe('1023 Bytes')
  expect(formatBytes(1024)).toBe('1 KB')
  expect(formatBytes(1025)).toBe('1 KB')
  expect(formatBytes(1100)).toBe('1.07 KB')
  expect(formatBytes(2048)).toBe('2 KB')
  expect(formatBytes(10000)).toBe('9.77 KB')
  expect(formatBytes(10240)).toBe('10 KB')
  expect(formatBytes(1.49250114e9)).toBe('1.39 GB')
})
