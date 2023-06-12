import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@components/icon-button.jsx'

export function DownButton(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof IconButton>
  , 'children'
  >
) {
  return (
    <IconButton {...props}>
      <ArrowDownIcon className='w-4 h-4' />
    </IconButton>
  )
}
