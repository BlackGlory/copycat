import { pass } from '@blackglory/prelude'

export async function migrate(previousVersion: string): Promise<void> {
  // Copycat V2升级到Copycat V3之间的数据是不可迁移的,
  // 因为V3使用的Manifest V3无法访问Manifest V2才有的localStorage.
  pass()
}
