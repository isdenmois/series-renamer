import { Component, Suspense } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { $selectedTorrent } from 'features/renamer/model'
import { useSignal } from 'libs/solid-nanostores'
import { RenamerPage } from 'pages/renamer'
import { TorrentsListPage } from 'pages/torrents'

import classes from './app.module.css'
import './theme.css'

export const App: Component = () => {
  const selectedTorrent = useSignal($selectedTorrent)

  return (
    <>
      <div id='movie-renamer-overlay' />

      <div class={classes.root}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Dynamic
            component={selectedTorrent() ? RenamerPage : TorrentsListPage}
          />
        </Suspense>
      </div>
    </>
  )
}
