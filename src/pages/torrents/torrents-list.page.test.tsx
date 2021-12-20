/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { cleanStores } from 'nanostores'
import { Suspense } from 'solid-js'
import { fireEvent, render, screen } from 'solid-testing-library'

import { api, Torrent } from 'api'
import { $selectedTorrent } from 'features/renamer/model'
import { mockPromise } from 'shared/test-utils'
import { TorrentsListPage } from './torrents-list.page'

describe('Torrents list page', () => {
  const torrents: Torrent[] = [
    { hash: '111', save_path: 'E:\\Downloads', name: 'Something else', size: 1024, completion_on: 1539729654 },
    { hash: '222', save_path: 'E:\\Series', name: 'Supa Series', size: 10000000, completion_on: 1639729654 },
    { hash: '333', save_path: 'E:\\Cources', name: 'Course to rule them all', size: 2500, completion_on: 1639429654 },
    { hash: '444', save_path: 'E:\\Downloads', name: 'Important stuff', size: 7500, completion_on: 1639729654 },
    { hash: '555', save_path: 'E:\\Series', name: 'A brand new series', size: 95000001, completion_on: 1635155100 },
    { hash: '666', save_path: 'E:\\Languages', name: 'English', size: 2048, completion_on: 1599895800 },
  ]

  it('should render the loader and the list', async () => {
    const [resolve] = mockPromise(api, 'fetchTorrents')

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <TorrentsListPage />
      </Suspense>
    ))

    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await resolve(torrents)

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

    const lists = screen.queryAllByRole('list')

    expect(lists.length).toBe(2)

    // Check the categories list
    expect(lists[0]).toHaveAttribute('data-testid', 'categories')
    expect(lists[0].getElementsByClassName('selected').item(0)).toHaveTextContent('E:\\Series')
    expect(lists[0].getElementsByTagName('li').length).toBe(4)

    // Check the torrents list
    expect(lists[1]).toHaveAttribute('data-testid', 'torrents')
    expect(lists[1].getElementsByTagName('li').length).toBe(2)
  })

  it('should apply filter on category change', async () => {
    jest.useFakeTimers()
    jest.spyOn(api, 'fetchTorrents').mockResolvedValue(torrents)
    $selectedTorrent.set(null)

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <TorrentsListPage />
      </Suspense>
    ))

    await jest.runAllTicks()

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()

    const [categories, torents] = screen.queryAllByRole('list')
    let torrentItems = torents.getElementsByClassName('title')

    // Default category
    expect(categories.querySelector('.selected')).toHaveTextContent('E:\\Series')
    expect(torrentItems.length).toBe(2)
    expect(torrentItems.item(0)).toHaveTextContent('Supa Series')
    expect(torrentItems.item(1)).toHaveTextContent('A brand new series')

    // Change category
    fireEvent.click(categories.children[1])
    torrentItems = torents.getElementsByClassName('title')

    expect(categories.querySelector('.selected')).toHaveTextContent('E:\\Downloads')
    expect(torrentItems.length).toBe(2)
    expect(torrentItems.item(0)).toHaveTextContent('Something else')
    expect(torrentItems.item(1)).toHaveTextContent('Important stuff')

    // Remove category
    fireEvent.click(categories.children[1])
    torrentItems = torents.getElementsByClassName('title')

    expect(categories.getElementsByClassName('selected').length).toBe(0)
    expect(torrentItems.length).toBe(6)
  })

  it('select a torrent', async () => {
    jest.useFakeTimers()
    jest.spyOn(api, 'fetchTorrents').mockResolvedValue(torrents)
    $selectedTorrent.set(null)

    render(() => (
      <Suspense fallback={<div role='progressbar' />}>
        <TorrentsListPage />
      </Suspense>
    ))

    await jest.runAllTicks()

    const torrentList = screen.getByTestId('torrents')

    expect($selectedTorrent.get()).toBeNull()
    fireEvent.click(torrentList.children[1])
    expect($selectedTorrent.get()).toBe('555')

    cleanStores($selectedTorrent)
  })
})
