import { render } from 'solid-js/web'
import { App } from './app'

const MOUNT_EL_ID = 'movie-renamer'

let dispose: Function | null = null

const el = document.createElement('div')
el.id = MOUNT_EL_ID
el.onclick = (e: any) => {
  if (e.target.id === 'movie-renamer-overlay') {
    dispose?.()
  }
}

chrome.runtime.onMessage.addListener(async (message: any) => {
  if (message.toggleVisible) {
    if (!dispose) {
      document.body.appendChild(el)

      dispose = render(() => <App />, el)
    } else {
      dispose()
      dispose = null
    }
  }
})
