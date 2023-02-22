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
  const [menu, setMenu] = useState<IMenuStore>({
    [MenuContext.Page]: []
  , [MenuContext.Frame]: []
  , [MenuContext.Link]: []
  , [MenuContext.Selection]: []
  , [MenuContext.Image]: []
  , [MenuContext.Video]: []
  , [MenuContext.Audio]: []
  })

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
