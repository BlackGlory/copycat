interface ICheckboxProps {
  value: boolean
  children: React.ReactNode

  onChange: (value: boolean) => void
}

export function Checkbox({ value, children, onChange }: ICheckboxProps) {
  return (
    <label className='py-2 flex space-x-1 cursor-pointer'>
      <input
        className='border accent-gray-700'
        type='checkbox'
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
      <div>{children}</div>
    </label>
  )
}
