export function convertURLToDataURL(url: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    const blob = await fetch(url).then(res => res.blob())
    const reader = new FileReader()

    reader.addEventListener('error', reject, { once: true })
    reader.addEventListener('loadend', () => {
      resolve(reader.result as string)
    }, { once: true })

    reader.readAsDataURL(blob)
  })
}
