/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { Suspense } from 'solid-js'
import { fireEvent, render, screen } from 'solid-testing-library'

import { api } from 'api'
import { $selectedTorrent } from 'features/renamer/model'
import { mockPromise } from 'shared/test-utils'

import { $renameProgress } from './renamer.model'
import { RenamerPage } from './renamer.page'

describe('<RenamerPage/>', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    $renameProgress.set(-1)
    $selectedTorrent.set('123456')
  })

  it('renders the list', async () => {
    const [resolve] = mockPromise(api, 'fetchFiles')

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <RenamerPage />
      </Suspense>
    ))

    expect(api.fetchFiles).toHaveBeenCalledWith('123456', expect.any(Function))
    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await resolve([
      { title: 'S01E01 Test.mkv', filename: '01.mkv', episode: 1 },
      { title: 'S01E02 Jest.mkv', filename: '02.mkv', episode: 2 },
    ])

    const buttons = screen.queryAllByRole('button')
    const items = screen.queryAllByRole('listitem')

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(buttons.length).toBe(2)
    expect(buttons[0]).toHaveTextContent('Cancel')
    expect(buttons[1]).toHaveTextContent('Rename')
    expect(buttons[0]).not.toBeDisabled()
    expect(buttons[1]).not.toBeDisabled()

    expect(items.length).toBe(2)
  })

  it('disables rename button when list is empty', async () => {
    jest.spyOn(api, 'fetchFiles').mockResolvedValue([])

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <RenamerPage />
      </Suspense>
    ))

    await jest.runAllTicks()

    const buttons = screen.queryAllByRole('button')
    const items = screen.queryAllByRole('listitem')

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    expect(buttons.length).toBe(2)
    expect(buttons[0]).toHaveTextContent('Cancel')
    expect(buttons[1]).toHaveTextContent('Rename')
    expect(buttons[0]).not.toBeDisabled()
    expect(buttons[1]).toBeDisabled()

    expect(items.length).toBe(0)
  })

  it('can change files titles', async () => {
    const files = [
      { title: 'S01E01 Test.mkv', filename: '01.mkv', episode: 1, season: 1, directory: '/Series' },
      { title: 'S01E02 Jest.mkv', filename: '02.mkv', episode: 2, season: 1, directory: '/Series' },
    ]
    jest.spyOn(api, 'fetchFiles').mockResolvedValue(files)

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <RenamerPage />
      </Suspense>
    ))

    await jest.runAllTicks()

    fireEvent.input(screen.queryAllByRole('textbox')[1], { target: { value: 'S01E02 Jesty.mkv' } })

    expect(files[1].title).toBe('S01E02 Jesty.mkv')
  })

  it('cancel', async () => {
    jest.spyOn(api, 'fetchFiles').mockResolvedValue([])

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <RenamerPage />
      </Suspense>
    ))

    await jest.runAllTicks()

    expect($selectedTorrent.get()).not.toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect($selectedTorrent.get()).toBeNull()
  })

  it('renames the files', async () => {
    const [resolve] = mockPromise(api, 'renameFile')
    jest.spyOn(api, 'fetchFiles').mockResolvedValue([
      { title: 'S01E01 Test.mkv', filename: '01.mkv', episode: 1, season: 1, directory: '/Series' },
      { title: 'S01E02 Jest.mkv', filename: '02.mkv', episode: 2, season: 1, directory: '/Series' },
    ])

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <RenamerPage />
      </Suspense>
    ))

    await jest.runAllTicks()

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect($renameProgress.get()).toBe(-1)
    expect($selectedTorrent.get()).not.toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Rename' }))

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent('1 / 2')
    expect($renameProgress.get()).toBe(0)
    expect($selectedTorrent.get()).not.toBeNull()

    await resolve(null)
    await jest.runAllTicks()

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect($renameProgress.get()).toBe(-1)
    expect($selectedTorrent.get()).toBeNull()

    expect(api.renameFile).toHaveBeenCalledWith('123456', '/Series/01.mkv', '/Series/S01E01 Test.mkv')
    expect(api.renameFile).toHaveBeenCalledWith('123456', '/Series/02.mkv', '/Series/S01E02 Jest.mkv')
  })
})
