import { PlusIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@components/icon-button.jsx'

export function AddButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <IconButton {...props}>
      <PlusIcon className='w-4 h-4' />
    </IconButton>
  )
}
