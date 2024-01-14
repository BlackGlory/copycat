import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'

interface IItem<T> {
  name: string
  value: T
}

interface ISelectProps<T> {
  items: Array<IItem<T>>
  value?: T
  onChange(value: T): void
}

export function Select<T>({ value, items, onChange }: ISelectProps<T>) {
  const item = items.find(x => x.value === value)

  return (
    <div className='h-6 w-52'>
      <Listbox
        value={value}
        onChange={value => onChange(value)}
      >
        <Listbox.Button className='pl-1 w-full h-full flex items-center border hover:bg-gray-300'>
          <span className='text-left flex-1'>{item?.name ?? ''}</span>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Listbox.Button>
        <Listbox.Options className='border border-t-0 relative max-h-64 bg-white overflow-y-scroll'>
          {items.map(item => (
            <Listbox.Option
              key={item.name}
              value={item.value}
              className='pl-1 cursor-pointer hover:bg-gray-300'
            >
              {item.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
