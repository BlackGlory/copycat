import { useState, useCallback } from 'react'
import { useMount } from 'extra-react-hooks'
import { IBackgroundAPI, IMenuStore, MenuContext } from '@src/contract.js'
import * as DelightRPC from 'delight-rpc'
import { go, isFunction } from '@blackglory/prelude'
import { Updater } from 'use-immer'
import { produce } from 'immer'

export function useMenu(client: DelightRPC.ClientProxy<IBackgroundAPI>): [
  menu: IMenuStore
, setMenu: Updater<IMenuStore>
] {
  const [menu, setMenu] = useState<IMenuStore>([
    { context: MenuContext.Page, items: [] }
  , { context: MenuContext.Frame, items: [] }
  , { context: MenuContext.Link, items: [] }
  , { context: MenuContext.Selection, items: [] }
  , { context: MenuContext.Image, items: [] }
  , { context: MenuContext.Video, items: [] }
  , { context: MenuContext.Audio, items: [] }
  ])

  useMount(() => {
    go(async () => {
      const menu = await client.getMenu()
      if (menu) {
        setMenu(menu)
      }
    })
  })

  const updateMenu: Updater<IMenuStore> = useCallback((arg) => {
    go(async () => {
      if (isFunction(arg)) {
        const newMenu = produce(menu, arg)
        setMenu(newMenu)
        await client.setMenu(newMenu)
      } else {
        const newMenu = arg
        setMenu(newMenu)
        await client.setMenu(newMenu)
      }
    })
  }, [menu])

  return [
    menu
  , updateMenu
  ]
}
