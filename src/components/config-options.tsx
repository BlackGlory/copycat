import { URLOptions } from '@components/url-options.jsx'
import { MarkdownOptions } from '@components/markdown-options.jsx'
import { HTMLOptions } from '@components/html-options.jsx'
import { i18n } from '@utils/i18n.js'

export function ConfigOptions() {
  return (
    <div>
      <h2 className='text-lg p-4 border-y font-bold'>{i18n('HeadingConfig')}</h2>
      <div>
        <Section>
          <URLOptions />
        </Section>

        <Section>
          <MarkdownOptions />
        </Section>

        <Section>
          <HTMLOptions />
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
