interface ICheckboxProps {
  value: boolean
  children: React.ReactNode
  onClick: (value: boolean) => void
}

export function Checkbox({ value, children, onClick }: ICheckboxProps) {
  return (
    <label className='flex space-x-1 cursor-pointer'>
      <input
        className='border accent-gray-700'
        type='checkbox'
        checked={value}
        onChange={e => onClick(e.target.checked)}
      />
      <div>{children}</div>
    </label>
  )
}
