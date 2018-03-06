declare namespace XSS {
  export interface IFilterXSSOptions {
    whiteList?: IWhiteList;
    onTag?: OnTagHandler;
    onTagAttr?: OnTagAttrHandler;
    onIgnoreTag?: OnTagHandler;
    onIgnoreTagAttr?: OnTagAttrHandler;
    safeAttrValue?: SafeAttrValueHandler;
    escapeHtml?: EscapeHandler;
    stripIgnoreTag?: boolean;
    stripIgnoreTagBody?: boolean | string[];
    allowCommentTag?: boolean;
    stripBlankChar?: boolean;
    css?: {} | boolean;
  }
}
