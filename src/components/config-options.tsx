import { useMemo } from 'react'
import { IBackgroundAPI } from '@src/contract.js'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { useConfig } from '@hooks/use-config.js'
import { URLOptions } from '@components/url-options.jsx'
import { MarkdownOptions } from '@components/markdown-options.jsx'

export function ConfigOptions() {
  const client = useMemo(() => createBackgroundClient<IBackgroundAPI>(), [])
  const [config, setConfig] = useConfig(client)

  return (
    <div>
      <URLOptions config={config} setConfig={setConfig} />
      <MarkdownOptions config={config} setConfig={setConfig} />
    </div>
  )
}
