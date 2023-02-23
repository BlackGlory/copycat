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
    <div>
      <section>
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
      </section>

      <section>
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
      </section>

      <section>
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
      </section>

      <section>
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
      </section>

      <section>
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
      </section>

      <section>
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
      </section>

      <section>
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
      </section>
    </div>
  )
}
