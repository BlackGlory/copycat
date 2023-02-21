import { ImageFormat } from '@src/contract.js'

export function convertUrlToImageDataURI(url: string, format?: ImageFormat): Promise<string> {
  if (format) {
    return new Promise<string>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        canvas.getContext('2d')!.drawImage(img, 0, 0)
        resolve(canvas.toDataURL(`image/${ format }`))
      }
      img.onerror = reject
      img.src = url
    })
  } else {
    return new Promise<string>(async (resolve, reject) => {
      const blob = await fetch(url).then(res => res.blob())
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }
}
