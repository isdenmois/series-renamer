import { api } from 'api'
import { $selectedTorrent } from 'features/renamer/model'
import { mockPromise } from 'shared/test-utils'
import { $renameProgress, renameFiles } from './renamer.model'

afterAll(() => {
  $selectedTorrent.set(null)
})

test('renameFiles', async () => {
  let [resolve] = mockPromise(api, 'renameFile')
  $selectedTorrent.set('qwerty')

  const promise = renameFiles([
    {
      directory: '/Series/Supa',
      episode: 1,
      season: 1,
      filename: 'S01E1oraora.mkv',
      title: 'S01E01 Ora.mkv',
    },
    {
      directory: '/Series/Supa',
      episode: 2,
      season: 1,
      filename: 'S01E2oraora.mkv',
      title: 'S01E02 Ora Ora.mkv',
    },
    {
      directory: '/Series/Supa',
      episode: 3,
      season: 1,
      filename: 'S01E03 Ora Ora Ora.mkv',
      title: 'S01E03 Ora Ora Ora.mkv',
    },
  ])

  expect($renameProgress.get()).toBe(0)
  expect(api.renameFile).toHaveBeenCalledWith('qwerty', '/Series/Supa/S01E1oraora.mkv', '/Series/Supa/S01E01 Ora.mkv')

  await resolve(null)
  expect($renameProgress.get()).toBe(1)
  expect(api.renameFile).toHaveBeenCalledWith(
    'qwerty',
    '/Series/Supa/S01E2oraora.mkv',
    '/Series/Supa/S01E02 Ora Ora.mkv',
  )

  await promise
  expect($renameProgress.get()).toBe(-1)
  expect($selectedTorrent.get()).toBeNull()
  expect(api.renameFile).not.toHaveBeenCalledWith(
    'qwerty',
    '/Series/Supa/S01E3 Ora Ora Ora.mkv',
    '/Series/Supa/S01E3 Ora Ora Ora.mkv',
  )
})
