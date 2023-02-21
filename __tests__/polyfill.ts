import { TextEncoder, TextDecoder } from 'util'

// 在JSDOM的测试环境下缺少TextEncoder
globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
