/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { $selectedTorrent } from 'features/renamer/model'
import { render, screen } from 'solid-testing-library'

jest.mock('pages/renamer', () => ({ RenamerPage: () => <h1>RenamerPage</h1> }))
jest.mock('pages/torrents', () => ({ TorrentsListPage: () => <h1>TorrentsListPage</h1> }))

import { App } from './app'

it('<App/>', () => {
  $selectedTorrent.set(null)
  render(() => <App />)

  expect(screen.getByRole('heading')).toHaveTextContent('TorrentsListPage')

  $selectedTorrent.set('777')
  expect(screen.getByRole('heading')).toHaveTextContent('RenamerPage')

  $selectedTorrent.set(null)
  expect(screen.getByRole('heading')).toHaveTextContent('TorrentsListPage')
})
