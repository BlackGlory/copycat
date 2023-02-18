import browser from 'webextension-polyfill'

export enum URLFormat {
  Original = 'original'
, Absolute = 'absolute'
, Relative = 'relative'
, RootRelative = 'root-relative'
}

export enum MarkdownFlavor {
  Commonmark = 'commonmark'
, GFM = 'gfm'
, Ghost = 'ghost'
}

export interface Config {
  version: string
  urlFormat: URLFormat
  markdownFlavor: MarkdownFlavor
}

function createDefaultConfig(): Config {
  return {
    version: browser.runtime.getManifest().version
  , urlFormat: URLFormat.Absolute
  , markdownFlavor: MarkdownFlavor.GFM
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
