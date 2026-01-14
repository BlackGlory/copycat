import { lazy } from '@blackglory/prelude'
import { createDOMParser } from 'extra-dom'

export const getDOMParser = lazy(() => createDOMParser())
