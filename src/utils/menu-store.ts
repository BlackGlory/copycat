import { IBackgroundAPI, IMenuStore, MenuContext } from '@src/contract.js'
import { go } from '@blackglory/prelude'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { Store, createStoreContext } from 'extra-react-store'

export class MenuStore extends Store<IMenuStore> {
  private client = createBackgroundClient<IBackgroundAPI>()

  constructor() {
    super([
      { context: MenuContext.Page, items: [] }
    , { context: MenuContext.Frame, items: [] }
    , { context: MenuContext.Link, items: [] }
    , { context: MenuContext.Selection, items: [] }
    , { context: MenuContext.Image, items: [] }
    , { context: MenuContext.Video, items: [] }
    , { context: MenuContext.Audio, items: [] }
    ])

    go(async () => {
      const menu = await this.client.getMenu()
      super.setState(menu)
    })
  }

  override setState(state: IMenuStore): void {
    super.setState(state)
    this.client.setMenu(state)
  }
}

export const MenuStoreContext = createStoreContext<IMenuStore>()
