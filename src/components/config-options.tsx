import { useMemo } from 'react'
import { IBackgroundAPI } from '@src/contract.js'
import { createBackgroundClient } from '@delight-rpc/webextension'
import { useConfig } from '@hooks/use-config.js'
import { URLOptions } from '@components/url-options.jsx'
import { MarkdownOptions } from '@components/markdown-options.jsx'
import { HTMLOptions } from '@components/html-options.jsx'
import { i18n } from '@utils/i18n.js'

export function ConfigOptions() {
  const client = useMemo(() => createBackgroundClient<IBackgroundAPI>(), [])
  const [config, setConfig] = useConfig(client)

  return (
    <div>
      <h2 className='text-lg p-4 border-y font-bold'>{i18n('HeadingConfig')}</h2>
      <div>
        <Section>
          <URLOptions config={config} setConfig={setConfig} />
        </Section>

        <Section>
          <MarkdownOptions config={config} setConfig={setConfig} />
        </Section>

        <Section>
          <HTMLOptions config={config} setConfig={setConfig} />
        </Section>
      </div>
    </div>
  )
}

function Section(
  props: Omit<
    React.ComponentPropsWithoutRef<'section'>
  , 'className'
  >
) {
  return (
    <section
      {...props}
      className='border-b last:border-b-0'
    />
  )
}
