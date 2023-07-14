import '@src/globals.css'
import { createRoot } from 'react-dom/client'
import { Options } from '@components/options.jsx'
import { assert } from '@blackglory/prelude'
import { ConfigStore, ConfigStoreContext } from '@utils/config-store.js'
import { MenuStore, MenuStoreContext } from '@utils/menu-store.js'

const main = document.querySelector('main')
assert(main, 'The main element not found')

const root = createRoot(main)
root.render(
  <ConfigStoreContext.Provider value={new ConfigStore()}>
    <MenuStoreContext.Provider value={new MenuStore()}>
      <Options />
    </MenuStoreContext.Provider>
  </ConfigStoreContext.Provider>
)
