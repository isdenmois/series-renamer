import { sortBy } from './sort'

describe('sort', () => {
  it('should work with an empty array', () => {
    expect(sortBy([], 'test')).toEqual([])
  })

  it('should work with an empty array', () => {
    expect(sortBy([{ test: 3 }, { test: 1 }, { test: 4 }, { test: 1 }], 'test')).toEqual([{ test: 1 }, { test: 1 }, {
      test: 3,
    }, { test: 4 }])
  })
})
