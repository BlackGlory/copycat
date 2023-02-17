declare module 'html2bbcode' {
  export interface Options {
    imagescale: boolean
    transsize: boolean
    nolist: boolean
    noalign: boolean
    noheading: boolean
  }

  export class BBCode {
    toString(): string
  }

  export class HTML2BBCode {
    constructor(options?: Options)
    feed(html: string): BBCode
  }
}