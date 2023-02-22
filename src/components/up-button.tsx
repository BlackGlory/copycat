import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@components/icon-button.jsx'

export function UpButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <IconButton {...props}>
      <ArrowUpIcon className='w-4 h-4' />
    </IconButton>
  )
}
