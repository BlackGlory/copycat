import { ConfigOptions } from '@components/config-options.jsx'
import { MenuOptions } from '@components/menu-options.jsx'

export function Options() {
  return (
    <div className='min-w-[600px]'>
      <ConfigOptions />
      <MenuOptions />
    </div>
  )
}
