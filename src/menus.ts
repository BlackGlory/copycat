import {
  PAGE_URL_TO_MARKDOWN
, PAGE_URL_TO_HTML
, LINK_TO_MARKDOWN
, LINK_TO_HTML
, SELECTION_TO_MARKDOWN
, SELECTION_TO_MARKDOWN_WITHOUT_HTML
, SELECTION_TO_HTML
, SELECTION_TO_HTML_LINK_ONLY
, SELECTION_TO_PLAIN
, SELECTION_TO_RAW_STRING
, IMAGE_TO_MARKDOWN
, IMAGE_TO_MARKDOWN_DATA_URI_JPEG
, IMAGE_TO_MARKDOWN_DATA_URI_PNG
, IMAGE_TO_MARKDOWN_DATA_URI_WEBP
, IMAGE_TO_HTML
, IMAGE_TO_HTML_DATA_URI_JPEG
, IMAGE_TO_HTML_DATA_URI_PNG
, IMAGE_TO_HTML_DATA_URI_WEBP
, IMAGE_TO_DATA_URI_RAW
, IMAGE_TO_DATA_URI_JPEG
, IMAGE_TO_DATA_URI_PNG
, IMAGE_TO_DATA_URI_WEBP
, AUDIO_TO_HTML
, VIDEO_TO_HTML
} from './symbols'

interface MenuItem {
  id?: string
  type?: string
  contexts?: string[]
  title?: string
}

export default new Map<string[], MenuItem[]>([
  [['page', 'frame'], [
    { id: PAGE_URL_TO_MARKDOWN }
  , { id: PAGE_URL_TO_HTML }
  ]]
, [['link'], [
    { id: LINK_TO_MARKDOWN }
  , { id: LINK_TO_HTML }
  ]]
, [['selection'], [
    { id: SELECTION_TO_MARKDOWN }
  , { id: SELECTION_TO_MARKDOWN_WITHOUT_HTML }
  , { id: 'selection-separator1', type: 'separator' }
  , { id: SELECTION_TO_HTML }
  , { id: SELECTION_TO_HTML_LINK_ONLY }
  , { id: 'selection-separator2', type: 'separator' }
  , { id: SELECTION_TO_PLAIN }
  , { id: SELECTION_TO_RAW_STRING }
  ]]
, [['image'], [
    { id: IMAGE_TO_MARKDOWN }
  , { id: IMAGE_TO_MARKDOWN_DATA_URI_JPEG }
  , { id: IMAGE_TO_MARKDOWN_DATA_URI_PNG }
  , { id: IMAGE_TO_MARKDOWN_DATA_URI_WEBP }
  , { id: IMAGE_TO_HTML }
  , { id: IMAGE_TO_HTML_DATA_URI_JPEG }
  , { id: IMAGE_TO_HTML_DATA_URI_PNG }
  , { id: IMAGE_TO_HTML_DATA_URI_WEBP }
  , { id: IMAGE_TO_DATA_URI_RAW }
  , { id: IMAGE_TO_DATA_URI_JPEG }
  , { id: IMAGE_TO_DATA_URI_PNG }
  , { id: IMAGE_TO_DATA_URI_WEBP }
  ]]
, [['audio'], [
    { id: AUDIO_TO_HTML }
  ]]
, [['video'], [
    { id: VIDEO_TO_HTML }
  ]]
])
