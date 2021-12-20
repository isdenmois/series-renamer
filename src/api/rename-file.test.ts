import { mockFetch } from 'shared/test-utils'
import { renameFile } from './rename-file'

it('renameFile', () => {
  const fetch = mockFetch().resolveText('+')

  expect(renameFile('12321', '/Series/Wicha/01.mkv', '/Series/Wicha/S02E01 Kurwa.mkv')).resolves.toBeTruthy()
  expect(fetch.spy).toHaveBeenCalledWith(
    'http://localhost:9990/api/v2/torrents/renameFile',
    expect.objectContaining({
      method: 'POST',
      body: 'hash=12321&oldPath=%2FSeries%2FWicha%2F01.mkv&newPath=%2FSeries%2FWicha%2FS02E01%20Kurwa.mkv',
    }),
  )
})
