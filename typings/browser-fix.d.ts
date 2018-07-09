declare namespace browser.contextMenus {
  interface OnClickData {
    /** The ID of the menu item that was clicked. */
    menuItemId: number | string
    /** The parent ID, if any, for the item clicked. */
    parentMenuItemId?: number | string
    /**
     * One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements.
     */
    mediaType?: string
    /** If the element is a link, the text of that link. */
    linkText?: string
    /** If the element is a link, the URL it points to. */
    linkUrl?: string
    /** Will be present for elements with a 'src' URL. */
    srcUrl?: string
    /**
     * The URL of the page where the menu item was clicked. This property is not set if the click occured in a
     * context where there is no current page, such as in a launcher context menu.
     */
    pageUrl?: string
    /** The URL of the frame of the element where the context menu was clicked, if it was in a frame. */
    frameUrl?: string
    /** The URL of the frame of the element where the context menu was clicked, if it was in a frame. */
    frameId?: number // FIX
    /** The text for the context selection, if any. */
    selectionText?: string
    /** A flag indicating whether the element is editable (text input, textarea, etc.). */
    editable: boolean
    /** A flag indicating the state of a checkbox or radio item before it was clicked. */
    wasChecked?: boolean
    /** A flag indicating the state of a checkbox or radio item after it is clicked. */
    checked?: boolean
    /** An array of keyboard modifiers that were held while the menu item was clicked. */
    modifiers: _OnClickDataModifiers[]
  }
}

declare interface Navigator {
  clipboard: {
    writeText(text: string): Promise<void>
  }
}