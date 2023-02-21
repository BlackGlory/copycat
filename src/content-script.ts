import { createServer } from '@delight-rpc/webextension'
import { IFrameAPI } from '@src/contract'

createServer<IFrameAPI>({
  getActiveElementContent
, getDocumentTitle
, getSelectionHTML
, getSelectionText
})

function getSelectionHTML(): string {
  const userSelection = window.getSelection()
  if (userSelection) {
    const range = userSelection?.getRangeAt(0)
    const clonedSelection = range.cloneContents()
    const div = document.createElement ('div')
    div.appendChild(clonedSelection)
    return div.innerHTML
  } else {
    return ''
  }
}

function getSelectionText(): string {
  return window.getSelection()?.toString() ?? ''
}

function getActiveElementContent(): string {
  return document.activeElement?.textContent ?? ''
}

function getDocumentTitle(): string {
  return document.title
}
