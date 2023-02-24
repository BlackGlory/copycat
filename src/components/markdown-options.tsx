import {
  IConfigStore
, MarkdownBullet
, MarkdownBulletOrdered
, MarkdownEmphasis
, MarkdownFence
, MarkdownListItemIndent
, MarkdownRule
, MarkdownStrong
} from '@src/contract.js'
import { Select } from '@components/select.jsx'
import { Updater } from 'use-immer'

interface IMarkdownOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function MarkdownOptions({ config, setConfig }: IMarkdownOptionsProps) {
  const { markdown } = config

  return (
    <div className='mb-2'>
      <h3 className='text-base px-4 py-2'>配置Markdown</h3>
      <div className='px-4 py-2 space-y-2'>
        <Section>
          <label>Bullets of items in unordered lists</label>
          <Select
            value={markdown.bullet}
            items={[
              {
                name: '*'
              , value: MarkdownBullet['*']
              }
            , {
                name: '+'
              , value: MarkdownBullet['+']
              }
            , {
                name: '+'
              , value: MarkdownBullet['-']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.bullet = value
            })}
          />
        </Section>

        <Section>
          <label>Bullets of items in ordered lists</label>
          <Select
            value={markdown.bulletOrdered}
            items={[
              {
                name: ')'
              , value: MarkdownBulletOrdered[')']
              }
            , {
                name: '.'
              , value: MarkdownBulletOrdered['.']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.bulletOrdered = value
            })}
          />
        </Section>

        <Section>
          <label>Emphasis</label>
          <Select
            value={markdown.emphasis}
            items={[
              {
                name: '*'
              , value: MarkdownEmphasis['*']
              }
            , {
                name: '_'
              , value: MarkdownEmphasis._
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.emphasis = value
            })}
          />
        </Section>

        <Section>
          <label>Fenced code</label>
          <Select
            value={markdown.fence}
            items={[
              {
                name: '`'
              , value: MarkdownFence['`']
              }
            , {
                name: '~'
              , value: MarkdownFence['~']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.fence = value
            })}
          />
        </Section>

        <Section>
          <label>Indention the content of list items</label>
          <Select
            value={markdown.listItemIndent}
            items={[
              {
                name: 'Space'
              , value: MarkdownListItemIndent.Space
              }
            , {
                name: 'Tab'
              , value: MarkdownListItemIndent.Tab
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.listItemIndent = value
            })}
          />
        </Section>

        <Section>
          <label>Thematic breaks</label>
          <Select
            value={markdown.rule}
            items={[
              {
                name: '*'
              , value: MarkdownRule['*']
              }
            , {
                name: '-'
              , value: MarkdownRule['-']
              }
            , {
                name: '_'
              , value: MarkdownRule['_']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.rule = value
            })}
          />
        </Section>

        <Section>
          <label>Strong</label>
          <Select
            value={markdown.strong}
            items={[
              {
                name: '*'
              , value: MarkdownStrong['*']
              }
            , {
                name: '_'
              , value: MarkdownStrong['_']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.strong = value
            })}
          />
        </Section>
      </div>
    </div>
  )
}

function Section(props: React.InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <section {...props} />
  )
}
