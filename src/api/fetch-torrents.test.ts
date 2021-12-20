import { mockFetch } from 'shared/test-utils'
import { fetchTorrents } from './fetch-torrents'

it('fetchTorrents', () => {
  const fetch = mockFetch().resolve([
    { hash: '111', save_path: '/Series', name: 'First' },
    { hash: '000', save_path: '/Series', name: 'Third' },
    { hash: '2', save_path: '/Downloads\\', name: 'Second' },
  ])

  expect(fetchTorrents()).resolves.toEqual([
    { hash: '111', save_path: '/Series', name: 'First' },
    { hash: '2', save_path: '/Downloads', name: 'Second' },
    { hash: '000', save_path: '/Series', name: 'Third' },
  ])
  expect(fetch.spy).toHaveBeenCalledWith(
    'http://localhost:9990/api/v2/torrents/info',
    expect.objectContaining({ method: 'GET' }),
  )
})
