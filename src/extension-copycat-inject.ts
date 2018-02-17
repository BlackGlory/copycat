function getSelectionHTML() : string {
  const userSelection = window.getSelection()
  const range = userSelection.getRangeAt(0)
  const clonedSelection = range.cloneContents()
  const div = document.createElement ('div')
  div.appendChild(clonedSelection)
  return div.innerHTML.toString()
}

function getSelectionText() : string {
  return window.getSelection().toString()
}

function getActiveElementContent() : string {
  return document.activeElement.textContent || ''
}

function getActiveImageDataURI() : string {
  const img = document.activeElement as HTMLImageElement
  console.log(img)
  return ''
}

browser.runtime.onMessage.addListener(async message => {
  switch(message.type) {
    case 'selection-html':
      return getSelectionHTML()
    case 'selection-text':
      return getSelectionText()
    case 'active-element-content':
      return getActiveElementContent()
    case 'active-image-datauri':
      return getActiveImageDataURI()
  }
})
