/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { cleanStores } from 'nanostores'
import { render, screen } from 'solid-testing-library'

import { $renameProgress } from '../renamer.model'
import { RenamingProgress } from './renaming-progress'

afterAll(() => {
  $renameProgress.set(-1)
  cleanStores($renameProgress)
})

test('<RenamingProgress/>', () => {
  $renameProgress.set(4)

  render(() => <RenamingProgress filesCount={10} />)

  expect(screen.getByRole('heading')).toHaveTextContent('5 / 10')

  $renameProgress.set(5)
  expect(screen.getByRole('heading')).toHaveTextContent('6 / 10')
})
