import { LocalStorage } from 'extra-webextension'
import { StorageItemKey, IStorage, IConfigStorage, MarkdownFlavor, URLFormat, URLEncoding } from '@src/contract.js'

const storage = new LocalStorage<IStorage>()

export async function initStorage(): Promise<void> {
  await storage.setItem(StorageItemKey.Config, {
    markdownFlavor: MarkdownFlavor.GFM
  , urlFormat: URLFormat.Absolute
  , urlEncoding: URLEncoding.AlwaysEncode
  })
}

export async function getConfig(): Promise<IConfigStorage> {
  return await storage.getItem(StorageItemKey.Config)
}

export async function setConfig(config: IConfigStorage): Promise<void> {
  await storage.setItem(StorageItemKey.Config, config)
}
