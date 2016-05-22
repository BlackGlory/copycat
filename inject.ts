'use strict'

function getSelectionHTML() : string {
  let userSelection = window.getSelection()
    , range = userSelection.getRangeAt(0)
    , clonedSelection = range.cloneContents()
    , div = document.createElement ('div')
  div.appendChild (clonedSelection)
  return div.innerHTML.toString()
}

chrome.runtime.onMessage.addListener((message: { type: string }, sender: chrome.runtime.MessageSender, sendResponse: (response: string) => void) => {
  switch(message.type) {
    case 'selection-html':
      sendResponse(getSelectionHTML())
      break
    case 'selection-text':
      sendResponse(window.getSelection().toString())
      break
    default:
  }
})