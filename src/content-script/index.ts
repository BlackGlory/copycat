import browser from 'webextension-polyfill'

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

browser.runtime.onMessage.addListener(async message => {
  switch (message.type) {
    case 'selection-html':
      return getSelectionHTML()
    case 'selection-text':
      return getSelectionText()
    case 'active-element-content':
      return getActiveElementContent()
    case 'document-title':
      return getDocumentTitle()
  }
})
