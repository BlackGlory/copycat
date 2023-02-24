import { ConfigOptions } from '@components/config-options.jsx'
import { MenuOptions } from '@components/menu-options.jsx'

export function Options() {
  return (
    <div className='min-w-[500px] min-h-[500px]'>
      <ConfigOptions />
      <MenuOptions />
    </div>
  )
}
