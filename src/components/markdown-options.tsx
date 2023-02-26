import {
  IConfigStore
, MarkdownBullet
, MarkdownBulletOrdered
, MarkdownEmphasis
, MarkdownFence
, MarkdownListItemIndent
, MarkdownThematicBreak
, MarkdownStrong
} from '@src/contract.js'
import { Select } from '@components/select.jsx'
import { Updater } from 'use-immer'
import { i18n } from '@utils/i18n.js'

interface IMarkdownOptionsProps {
  config: IConfigStore
  setConfig: Updater<IConfigStore>
}

export function MarkdownOptions({ config, setConfig }: IMarkdownOptionsProps) {
  const { markdown } = config

  return (
    <div className='mb-2'>
      <h3 className='text-base px-4 py-2'>{i18n('headingMarkdownConfig')}</h3>
      <div className='px-4 py-2 space-y-2'>
        <Section>
          <label>{i18n('labelMarkdownEmphasis')}</label>
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
          <label>{i18n('labelMarkdownStrong')}</label>
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

        <Section>
          <label>{i18n('labelMarkdownBulletUnordered')}</label>
          <Select
            value={markdown.bulletUnordered}
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
                name: '-'
              , value: MarkdownBullet['-']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.bulletUnordered = value
            })}
          />
        </Section>

        <Section>
          <label>{i18n('labelMarkdownBulletOrdered')}</label>
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
          <label>{i18n('labelMarkdownIndention')}</label>
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
          <label>{i18n('labelMarkdownThematicBreak')}</label>
          <Select
            value={markdown.thematicBreak}
            items={[
              {
                name: '*'
              , value: MarkdownThematicBreak['*']
              }
            , {
                name: '-'
              , value: MarkdownThematicBreak['-']
              }
            , {
                name: '_'
              , value: MarkdownThematicBreak['_']
              }
            ]}
            onChange={value => setConfig(config => {
              config.markdown.thematicBreak = value
            })}
          />
        </Section>

        <Section>
          <label>{i18n('labelMarkdownFence')}</label>
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
      </div>
    </div>
  )
}

function Section(props: React.InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <section {...props} />
  )
}
