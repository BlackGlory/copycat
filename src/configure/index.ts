import browser from 'webextension-polyfill'

export type UrlFormat =
| 'original'
| 'absolute'
| 'relative'
| 'root-relative'

export type MarkdownFlavor =
| 'commonmark'
| 'gfm'
| 'ghost'

export interface Config {
  version: string
  urlFormat: UrlFormat
  markdownFlavor: MarkdownFlavor
}

function createDefaultConfig(): Config {
  return {
    version: browser.runtime.getManifest().version
  , urlFormat: 'absolute'
  , markdownFlavor: 'gfm'
  }
}

export function loadConfigure(): Config {
  const config = localStorage.getItem('config')
  if (config) {
    return JSON.parse(config)
  }
  return createDefaultConfig()
}

export function saveConfigure(config: Config) {
  config = {
    ...createDefaultConfig()
  , ...config
  }
  localStorage.setItem('config', JSON.stringify(config))
}
