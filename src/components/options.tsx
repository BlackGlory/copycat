import { ConfigEditor } from '@components/config-editor.jsx'
import { MenuEditor } from '@components/menu-editor.jsx'

export function Options() {
  return (
    <div className='min-w-[600px]'>
      <ConfigEditor />
      <MenuEditor />
    </div>
  )
}
