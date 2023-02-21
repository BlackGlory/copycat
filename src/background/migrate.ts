import { createMigration } from 'extra-semver'
import { pipeAsync } from 'extra-utils'

export async function migrate(previousVersion: string): Promise<void> {
  await pipeAsync(
    previousVersion
  , createMigration('^2.0.0', '3.0.0', async () => {
      // TODO
    })
  )
}
