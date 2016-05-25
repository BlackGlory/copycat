// Type definitions for sanitize-html 1.11.4
// Project: https://github.com/punkave/sanitize-html
// Definitions by: Black Glory <https://github.com/BlackGlory>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module "sanitize-html" {

	function sanitizeHtml(s: string, opts?: {
		allowedTags?: string[] | boolean
		allowedSchemes?: string[]
		allowedAttributes?: { [index: string]: string[] } | boolean | any[]
		allowedClasses?: { [index: string]: string[] }
		transformTags?: { [index: string]: any }
		exclusiveFilter?: {
			[index: string]: (frame: {
				tag: string
				attribs: { [index: string]: string }
				text: string
				tagPosition: number
			}) => boolean
		}
		nonTextTags?: string[]
		parser?: {
			decodeEntities?: boolean
		}
	}): string

	export = sanitizeHtml
}
