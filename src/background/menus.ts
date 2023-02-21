interface IMenuItem {
  id?: string
  type?: string
  contexts?: string[]
  title?: string
}

export const menus = new Map<string[], IMenuItem[]>([
  [['page'], [
    { id: 'TAB_URL_TO_PLAIN' }
  , { id: 'TAB_URL_TO_MARKDOWN' }
  , { id: 'TAB_URL_TO_BBCODE' }
  , { id: 'TAB_URL_TO_HTML' }
  ]]
, [['frame'], [
    { id: 'FRAME_URL_TO_PLAIN' }
  , { id: 'FRAME_URL_TO_MARKDOWN' }
  , { id: 'FRAME_URL_TO_BBCODE' }
  , { id: 'FRAME_URL_TO_HTML' }
  ]]
, [['link'], [
    { id: 'LINK_TEXT' }
  , { id: 'LINK_TO_MARKDOWN' }
  , { id: 'LINK_TO_BBCODE' }
  , { id: 'LINK_TO_HTML' }
  ]]
, [['selection'], [
    { id: 'SELECTION_TO_MARKDOWN' }
  , { id: 'SELECTION_TO_BBCODE' }
  , { id: 'SELECTION_TO_HTML' }
  , { id: 'SELECTION_TO_HTML_ONLY_A_TAG' }
  , { id: 'SELECTION_TO_HTML_NO_ATTR' }
  , { id: 'SELECTION_TO_PLAIN' }
  , { id: 'SELECTION_TO_PLAIN_TRIMMED' }
  , { id: 'SELECTION_TO_RAW_STRING' }
  ]]
, [['image'], [
    { id: 'IMAGE_TO_MARKDOWN' }
  , { id: 'IMAGE_TO_MARKDOWN_DATA_URI_JPEG' }
  , { id: 'IMAGE_TO_MARKDOWN_DATA_URI_PNG' }
  , { id: 'IMAGE_TO_MARKDOWN_DATA_URI_WEBP' }
  , { id: 'IMAGE_TO_BBCODE' }
  , { id: 'IMAGE_TO_HTML' }
  , { id: 'IMAGE_TO_HTML_DATA_URI_JPEG' }
  , { id: 'IMAGE_TO_HTML_DATA_URI_PNG' }
  , { id: 'IMAGE_TO_HTML_DATA_URI_WEBP' }
  , { id: 'IMAGE_TO_DATA_URI_RAW' }
  , { id: 'IMAGE_TO_DATA_URI_JPEG' }
  , { id: 'IMAGE_TO_DATA_URI_PNG' }
  , { id: 'IMAGE_TO_DATA_URI_WEBP' }
  ]]
, [['audio'], [
    { id: 'AUDIO_TO_HTML' }
  ]]
, [['video'], [
    { id: 'VIDEO_TO_HTML' }
  ]]
])
