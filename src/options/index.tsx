import { createRoot } from 'react-dom/client'
import { Options } from '@components/options'
import { assert } from '@blackglory/prelude'

const main = document.querySelector('main')
assert(main, 'The main element not found')

const root = createRoot(main)
root.render(<Options />)
