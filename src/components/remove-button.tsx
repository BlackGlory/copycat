import { TrashIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@components/icon-button.jsx'

export function RemoveButton(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof IconButton>
  , 'children'
  >
) {
  return (
    <IconButton {...props}>
      <TrashIcon className='w-4 h-4' />
    </IconButton>
  )
}
