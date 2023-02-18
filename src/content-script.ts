import { createServer } from '@delight-rpc/webextension'
import { ITabAPI } from '@src/contract'

createServer<ITabAPI>({
  getActiveElementContent
, getDocumentTitle
, getSelectionHTML
, getSelectionText
})

function getSelectionHTML(): string {
  const userSelection = window.getSelection()
  const range = userSelection!.getRangeAt(0)
  const clonedSelection = range.cloneContents()
  const div = document.createElement ('div')
  div.appendChild(clonedSelection)
  return div.innerHTML.toString()
}

function getSelectionText(): string {
  return window.getSelection()!.toString()
}

function getActiveElementContent(): string {
  return document.activeElement!.textContent || ''
}

function getDocumentTitle(): string {
  return document.title
}
