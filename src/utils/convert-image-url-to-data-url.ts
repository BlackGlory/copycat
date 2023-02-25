import { ImageFormat } from '@src/contract.js'

export function convertImageURLToDataURL(
  imageURL: string
, format?: ImageFormat
): Promise<string> {
  if (format) {
    return new Promise<string>((resolve, reject) => {
      const img = new Image()

      img.addEventListener('error', reject, { once: true })
      img.addEventListener('load', () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)

        resolve(canvas.toDataURL(`image/${format}`))
      }, { once: true })

      img.src = imageURL
    })
  } else {
    return new Promise<string>(async (resolve, reject) => {
      const blob = await fetch(imageURL).then(res => res.blob())
      const reader = new FileReader()

      reader.addEventListener('error', reject, { once: true })
      reader.addEventListener('loadend', () => {
        resolve(reader.result as string)
      }, { once: true })

      reader.readAsDataURL(blob)
    })
  }
}
